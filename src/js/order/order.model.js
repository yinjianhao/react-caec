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
const DETAIL_NOTPAY_URL = `${basePath}/member/order/notpay`;
const DETAIL_URL = `${basePath}/member/order/detail`;

function processOrderListData(orders) {
    //遍历主订单
    for (let i = 0, l = orders.length; i < l; i++) {
        let order = orders[i];
        let subOrders = order.subOrders;
        //未付款和已关闭,合并所有子订单商品
        if (order.status == '01' || order.status == '23') {
            for (let j = 1, k = subOrders.length; j < k; j++) {
                subOrders[0].goods.concat(subOrders[j].goods);
            }
            subOrders = subOrders.slice(0, 1);
            continue;
        }

        //新建主订单,将子订单拼接起来
        if (subOrders.length > 1) {
            let currentI = i;

            for (let subOrder of subOrders) {
                let newOrder = Object.assign(order);
                newOrder.subOrders = [subOrder];

                //将新增订单按顺序加入列表当中
                i++;
                orders.splice(i, 0, newOrder);
            }

            //删除原有订单
            orders.splice(currentI, 1);
            i--;
        }
    }

    return orders;
}

const model = {
    name: 'order',
    initialState: {
        isLoading: false,
        orderList: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
        },
        detail: {}
    },
    reducers: createReducer([], {
        ORDER_LIST(state, action) {
            let {index} = action.payLoad;
            let { data } = action.payLoad.response;

            let orderList = processOrderListData(data);

            return { ...state, orderList: { ...state.orderList, [index]: orderList }, isLoading: false }
        },
        ORDER_DETAIL(state, action) {
            let { data } = action.payLoad.response;

            return { ...state, detail: data, isLoading: false }
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
                    successPayLoad: { index },
                    url: ORDER_LIST_URL,
                    type: 'GET',
                    params: {
                        pageIndex: 1,
                        pageSize: 30,
                        status: JSON.stringify(orderState[index])
                    }
                }
            });
        },
        * detail(action, { update, put, call }) {
            yield update({ isLoading: true });

            yield put({
                type: baseType,
                payLoad: {
                    successType: 'ORDER_DETAIL',
                    url: DETAIL_URL,
                    type: 'GET',
                    params: {
                        id: action.payLoad.id
                    }
                }
            });
        }
    }
}

export default model