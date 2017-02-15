const host = 'https://cms.changan.com.cn';
const url = `${host}/bsl-daq/api/v1/records`;

const demo = {
    name: 'daq',
    initialState: {},
    sagas: {
        * pathConversion(action, { update, put, call }) {
            console.log(action.payload)
            const response = yield call(fetch, url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            })
            if (response) {
                yield put({ type: "crudModules.SUCCESS", response });
                // yield put({type: "crudModules.SUCCESS", Object.assign({})})
            } else {
                yield put({ type: "crudModules.FAILURE", error })
            }
        },
        * deviceVitality(action, { update, put, call }) {
            console.log(action.payload)
            const response = yield call(fetch, url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            })
            if (response) {
                yield put({ type: "crudModules.SUCCESS", response });
                // yield put({type: "crudModules.SUCCESS", Object.assign({})})
            } else {
                yield put({ type: "crudModules.FAILURE", error })
            }
        },
        * deviceResolution(action, { update, put, call }) {
            console.log(action.payload)
            const response = yield call(fetch, url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            })
            if (response) {
                yield put({ type: "crudModules.SUCCESS", response });
                // yield put({type: "crudModules.SUCCESS", Object.assign({})})
            } else {
                yield put({ type: "crudModules.FAILURE", error })
            }
        },
        * userLocation(action, { update, put, call }) {
            console.log(action.payload)
            const response = yield call(fetch, url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            })
            if (response) {
                yield put({ type: "crudModules.SUCCESS", response });
                // yield put({type: "crudModules.SUCCESS", Object.assign({})})
            } else {
                yield put({ type: "crudModules.FAILURE", error })
            }
        },
        * networkConnection(action, { update, put, call }) {
            console.log(action.payload)
                // debugger
            const response = yield call(fetch, url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            })
            if (response) {
                yield put({ type: "crudModules.SUCCESS", response });
                // yield put({type: "crudModules.SUCCESS", Object.assign({})})
            } else {
                yield put({ type: "crudModules.FAILURE", error })
            }
        },

        * list(action, { update, put, call }) {
            yield update({ isFetching: true })

            // yield put({ type: "crudModules.REQUEST", payload: {isFetching: true} })
            const response = yield call(fetch, `${host}/system/api/v1/modules`)
            if (response) {
                yield put({ type: "crudModules.SUCCESS", response });
                // yield put({type: "crudModules.SUCCESS", Object.assign({})})
            } else {
                yield put({ type: "crudModules.FAILURE", error })
            }
        }
    }
}

export default demo