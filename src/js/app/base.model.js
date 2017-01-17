import { createReducer } from 'restack-core'
import { select } from 'redux-saga/effects'
import _ from 'lodash'

const basePath = 'https://ssl.mall.changan.com.cn';
const baseType = 'base/loadData';

const RELOGIN = 'base/reLogin';
const token = 'So6wjbkDChlIBSeajfovGOfrRMUiPwji';

const model = {
    name: 'base',
    initialState: {
        isLoading: false
    },
    sagas: {
        *loadData(action, { update, put, call }) {
            let {successType, successPayLoad = {}, errorType, noToken = false, url, params, type = 'GET'} = action.payLoad;
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

            const response = yield call(fetch, url, data);

            if (response.statusText === 'OK') {
                const data = yield response.json().then(param => param);

                if (data.result == -1) {
                    // yield put({
                    //     type: RELOGIN
                    // })
                    console.warn('token过期了！');
                } else {
                    successPayLoad.response = data;
                    yield put({
                        type: successType,
                        payLoad: successPayLoad
                    })
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
        *reLogin(action, { update, put, call }) {

        }
    }
}

export default model
export { basePath, baseType }
