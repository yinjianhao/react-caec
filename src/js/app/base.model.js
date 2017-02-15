import { createReducer } from 'restack-core'
import { select } from 'redux-saga/effects'
import _ from 'lodash'

const basePath = 'https://ssl.mall.changan.com.cn';
const baseType = 'base/ajax';
const baseError = 'base/error';

const RELOGIN_URL = `${basePath}/main/user/relogin`;

const baseFetch = function(options) {
    let { noToken = false, url, params, type = 'GET' } = options;

    let data = {};
    let body = '',
        key;

    for (key in params) {
        body = body + key + '=' + params[key] + '&';
    }

    if (!noToken) {
        let token = localStorage.getItem('token');

        body = body + 'token=' + token;
    } else {
        //去除最后一个&
        body = body.substring(0, body.length - 1);
    }

    if (type === 'GET' || type === 'get') {
        url = url + '?' + body;
    } else {
        data = {
            method: type,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body
        }
    }

    return fetch(url, data);
}

const model = {
    name: 'base',
    initialState: {
        isLoading: false
    },
    reducers: createReducer([], {

    }),
    sagas: {
        * ajax(action, { update, put, call }) {
            let { successType, successPayLoad = {}, errorType = baseError } = action.payLoad;

            const response = yield baseFetch(action.payLoad);

            if (response.ok) {
                const data = yield response.json().then(param => param);

                if (data.result == -1) {

                    // console.warn('token过期了！');
                    // yield put({
                    //     type: 'base/reLogin'
                    // })
                    // console.log('reLogin完了');

                    // yield put({
                    //     type: 'base/reLogin'
                    // })
                    // console.log('reLogin完了2');

                    let { encodePsd, mobile, mod } = JSON.parse(localStorage.getItem('info'));

                    const response = yield baseFetch({
                        noToken: true,
                        url: RELOGIN_URL,
                        type: 'POST',
                        params: {
                            mobile,
                            password: encodePsd,
                            mod
                        }
                    });

                    if (response.ok) {
                        let data = yield response.json().then(data => data);

                        if (data.result == 0) {
                            let { token, password, key } = data.data;
                            let info = JSON.parse(localStorage.getItem('info'));
                            info.encodePsd = password;
                            info.token = token;
                            info.mod = key;
                            localStorage.setItem('info', JSON.stringify(info));
                            localStorage.setItem('token', token);
                            //重新请求
                            yield put(action);
                        }
                    }
                } else {
                    if (successType) {
                        successPayLoad.response = data;
                        yield put({
                            type: successType,
                            payLoad: successPayLoad
                        })
                    }
                }
            } else {
                yield put({
                    type: errorType,
                    data: {
                        error: response
                    }
                })
            }
        },
        * error(action, { update, put, call }) {
            console.error('-------请求失败了哦!---------');
        },
        * reLogin(action, { update, put, call }) {
            let info = JSON.parse(localStorage.getItem('info'));
            let { encodePsd, mobile, mod } = info;

            // yield put({
            //     type: baseType,
            //     payLoad: {
            //         successType: 'RELOGIN',
            //         noToken: true,
            //         url: RELOGIN_URL,
            //         type: 'POST',
            //         params: {
            //             mobile,
            //             password: encodePsd,
            //             mod
            //         }
            //     }
            // });
            console.log('beforebaseFetch');
            const response = yield baseFetch({
                noToken: true,
                url: RELOGIN_URL,
                type: 'POST',
                params: {
                    mobile,
                    password: encodePsd,
                    mod
                }
            });
            console.log('baseFetch');
            if (response.ok) {
                let data = yield response.json().then(data => data);
                let { token, password, key } = data.data;
                let info = JSON.parse(localStorage.getItem('info'));
                info.encodePsd = password;
                info.token = token;
                info.mod = key;

                localStorage.setItem('info', JSON.stringify(info));
                localStorage.setItem('token', token);
                console.log('beforeupdate', token);
                yield update({ token });
                console.log('update', token);
            }
        }
    }
}

export default model
export { basePath, baseType, baseFetch }