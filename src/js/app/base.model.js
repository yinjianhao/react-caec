import { createReducer } from 'restack-core'
import { select } from 'redux-saga/effects'
import _ from 'lodash'

const basePath = 'https://ssl.mall.changan.com.cn';
const baseType = 'base/ajax';
const baseError = 'base/error';

const RELOGIN = 'base/reLogin';

const ProcessData = function () {

}

const model = {
    name: 'base',
    initialState: {
        isLoading: false
    },
    sagas: {
        *ajax(action, { update, put, call }) {
            let {successType, successPayLoad = {}, errorType = baseError, noToken = false, url, params, type = 'GET'} = action.payLoad;
            let data = {};
            let body = '', key;

            const token = yield select(data => data.my.token);

            for (key in params) {
                body = body + key + '=' + params[key] + '&';
            }

            if (!noToken) {
                // body = body + key + '=' + window.localStorage.getItem('token');
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

            const response = yield call(fetch, url, data);
            // console.log(response);
            if (response.ok) {
                const data = yield response.json().then(param => param);

                if (data.result == -1) {
                    // yield put({
                    //     type: RELOGIN
                    // })
                    console.warn('token过期了！');
                } else {
                    if (successType) {
                        successPayLoad.response = data;
                        yield put({
                            type: successType,
                            payLoad: successPayLoad
                        })
                    }
                    //  else {
                    //     return data;
                    // }
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
        *error(action, { update, put, call }) {
            console.error('-------请求失败了哦!---------');
        },
        *reLogin(action, { update, put, call }) {

        }
    }
}

const baseFetch = function (options) {
    let {noToken = false, url, params, type = 'GET'} = options;

    let data = {};
    let body = '', key;

    for (key in params) {
        body = body + key + '=' + params[key] + '&';
    }

    if (!noToken) {
        // body = body + key + '=' + window.localStorage.getItem('token');
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

export default model
export { basePath, baseType, baseFetch }
