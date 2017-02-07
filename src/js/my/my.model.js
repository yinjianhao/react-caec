import { createReducer } from 'restack-core';
import { select } from 'redux-saga/effects';
import { basePath, baseType, baseFetch } from '../app/base.model';
import _ from 'lodash';
import moduleName from '../shared/utils/security.js';

const PUBLICKEY_URL = `${basePath}/main/user/generatePublicKey`;
const LOGIN_URL = `${basePath}/main/user/loginEncrypt`;
const RELOGIN_URL = `${basePath}/main/user/relogin`;
const OVERVIEW_URL = `${basePath}/member/order/overview`;
const ADDRESS_LIST_URL = `${basePath}/member/receiving/list`;

const model = {
    name: 'my',
    initialState: {
        isLogin: false,
        userPhoto: '',
        mobile: '',
        nickname: '',
        overview: {},
        address: []
    },
    reducers: createReducer([], {
        ACTIVITY_LIST(state, action) {
            let activityList = action.payLoad.response.data;
            return {...state, activityList }
        },
        LOGIN(state, action) {
            let data = action.payLoad.response.data;
            let { img, mobile, nickname, mod, exp } = data;
            let { psd } = action.payLoad;
            let publicKey = RSAUtils.getKeyPair(exp, '', mod); //公钥
            let encodePsd = RSAUtils.encryptedString(publicKey, encodeURIComponent(psd)); //密文

            data.encodePsd = encodePsd;
            localStorage.setItem('info', JSON.stringify(data));
            return {...state, mobile, nickname, userPhoto: img, isLogin: true }
        },
        RELOGIN(state, action) {
            let { token, password, key } = action.payLoad.response.data;

            let info = JSON.parse(localStorage.getItem('info'));
            info.encodePsd = password;
            info.token = token;
            info.mod = key;

            localStorage.setItem('info', JSON.stringify(info));

            return state;
        },
        LOGINOUT(state, action) {
            localStorage.removeItem('info');
            return {...state, isLogin: false }
        },
        SET_LOGIN(state, action) {
            let info = localStorage.getItem('info');
            if (!info) {
                return {...state, isLogin: false }
            }

            info = JSON.parse(info);
            let { token, img, mobile, nickname } = info;

            return {...state, token, mobile, nickname, userPhoto: img, isLogin: true }
        },
        SET_OVERVIEW(state, action) {
            let overview = action.payLoad.response.data;

            return {...state, overview }
        },
        SET_ADDRESS(state, action) {
            let address = action.payLoad.response.data;

            return {...state, address }
        }
    }),
    sagas: {
        * login(action, { update, put, call }) {
            let { phone, psd } = action.payLoad;

            // const response = yield put({
            //     type: baseType,
            //     payLoad: {
            //         noToken: true,
            //         url: PUBLICKEY_URL,
            //         type: 'POST'
            //     }
            // });

            const response = yield baseFetch({
                noToken: true,
                url: PUBLICKEY_URL,
                type: 'POST'
            });

            if (response.ok) {
                let data = yield response.json().then(data => data);
                let { exp, mod } = data.data;
                let publicKey = RSAUtils.getKeyPair(exp, '', mod); //公钥
                let encodePsd = RSAUtils.encryptedString(publicKey, encodeURIComponent(psd)); //密文

                yield put({
                    type: baseType,
                    payLoad: {
                        successType: 'LOGIN',
                        successPayLoad: {
                            psd
                        },
                        noToken: true,
                        url: LOGIN_URL,
                        type: 'POST',
                        params: {
                            mobile: phone,
                            password: encodePsd,
                            mod
                        }
                    }
                });
            }
        },
        * overview(action, { update, put, call }) {
            yield put({
                type: baseType,
                payLoad: {
                    successType: 'SET_OVERVIEW',
                    url: OVERVIEW_URL,
                    type: 'GET'
                }
            });
        },
        * addressList(action, { update, put, call }) {
            yield put({
                type: baseType,
                payLoad: {
                    successType: 'SET_ADDRESS',
                    url: ADDRESS_LIST_URL,
                    type: 'POST'
                }
            });
        }
    }
}

export default model