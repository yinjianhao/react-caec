import { createReducer } from 'restack-core';
import { select } from 'redux-saga/effects';
import { basePath, baseType, baseFetch } from '../app/base.model';
import _ from 'lodash';

const orderState = [
    [],
    ['01'],
    ['02', '03', '04', '06'],
    ['07', '30'],
    ['26'],
    ['09', '11', '26']
];
const ORDER_LIST_URL = `${basePath}/member/order/list`;

const model = {
    name: 'order',
    initialState: {
        isLoading: false,
        orderList: []
    },
    reducers: createReducer([], {
        ORDER_LIST(state, action) {
            const { data } = action.payLoad.response;

            return {...state, orderList: data, isLoading: false }
        }
    }),
    sagas: {
        * list(action, { update, put, call }) {
            yield update({ isLoading: true });

            const { index } = action.payLoad;

            yield put({
                type: baseType,
                payLoad: {
                    successType: 'ORDER_LIST',
                    url: ORDER_LIST_URL,
                    type: 'GET',
                    params: {
                        pageIndex: 1,
                        pageSize: 20,
                        status: JSON.stringify(orderState[index])
                    }
                }
            });
        }
    }
}

export default model