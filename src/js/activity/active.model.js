import { createReducer } from 'restack-core'
import { select } from 'redux-saga/effects'
import { basePath, baseType } from '../app/base.model'
import _ from 'lodash'

const ACTIVITY_LIST_URL = `${basePath}/main/actives/list`;

const model = {
    name: 'activity',
    initialState: {
        isLoading: false,
        activityList: []
    },
    reducers: createReducer([], {
        ACTIVITY_LIST(state, action) {
            let activityList = action.payLoad.response.data;
            return { ...state, isLoading: false, activityList }
        },
        LOADING(state, action) {
            return { isLoading: action.payLoad.isLoading }
        }
    }),
    sagas: {
        *list(action, { update, put, call }) {
            // yield update({ isLoading: true });
            // yield put({ type: 'LOADING', payLoad: { isLoading: true } });

            yield put({
                type: baseType,
                payLoad: {
                    successType: 'ACTIVITY_LIST',
                    url: ACTIVITY_LIST_URL,
                    type: 'POST',
                    params: {
                        channelId: 'app_home_list',
                        status: 0
                    }
                }
            });
        }
    }
}

export default model
