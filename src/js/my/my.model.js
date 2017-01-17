import { createReducer } from 'restack-core'
import { select } from 'redux-saga/effects'
import { basePath, baseType } from '../app/base.model'
import _ from 'lodash'

const ACTIVITY_LIST_URL = `${basePath}/main/actives/list`;

const model = {
    name: 'my',
    initialState: {
        isLogin: false,
        userPhoto: ''
    },
    reducers: createReducer([], {
        ACTIVITY_LIST(state, action) {
            let activityList = action.payLoad.response.data;
            return { ...state, activityList }
        }
    }),
    sagas: {
        *login(action, { update, put, call }) {

        }
    }
}

export default model
