import { createReducer } from 'restack-core'
import { select } from 'redux-saga/effects'
import { basePath, baseType } from '../app/base.model'
import _ from 'lodash'

const HOME_AD_URL = `${basePath}/main/actives/list`;

const crud = {
	name: 'crud',
	initialState: {
		isFetching: false,
		didInvalidate: false,
		swipeList: [],
	},
	reducers: createReducer([], {
		HOME_AD_LIST(state, action) {
			const { data } = action.payLoad.response;

			return { ...state, swipeList: data }
		}
	}),
	sagas: {
		*list(action, {update, put, call}) {
			yield update({ isFetching: true })

			// yield put({ type: "crudModules.REQUEST", payload: {isFetching: true} })
			const response = yield call(fetch, `/system/api/v1/modules`)
			if (response) {
				yield put({ type: "crudModules.SUCCESS", response });
				// yield put({type: "crudModules.SUCCESS", Object.assign({})})
			} else {
				yield put({ type: "crudModules.FAILURE", error })
			}
		},
		*swipe(action, { update, put, call }) {
			yield put({
				type: baseType,
				payLoad: {
					successType: 'HOME_AD_LIST',
					url: HOME_AD_URL,
					type: 'GET',
					params: action.payLoad
				}
			});
		}
	}
}

export default crud
