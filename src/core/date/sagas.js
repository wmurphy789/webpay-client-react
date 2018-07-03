import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import { DATES_REQUESTED } from './constants'
import { getDatesSuccess, getDatesError } from './actions'
import { getAccessToken } from 'core/user'
import api from './api'

function* dateRequestedFlow(action) {
  try {
    const { query } = action
    const token = yield select(getAccessToken)
    const data = yield call(api.getDates, token, query)
    yield put(getDatesSuccess(data.data))

  } catch (error) {
    yield put(getDatesError(error))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* dateWatcher() {
  yield all([
    takeLatest(DATES_REQUESTED, dateRequestedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const dateSagas = [
  fork(dateWatcher),
]
