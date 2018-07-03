import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import { ACCOUNT_REQUESTED, CURRENT_PAYMENT_REQUESTED } from './constants'
import {
  getAccountSuccess, getAccountError,
  getCurrentPaymentSuccess, getCurrentPaymentError
 } from './actions'
import { getAccessToken } from 'core/user'
import api from './api'

function* currentPaymentRequestedFlow(action) {
  try {
    const token = yield select(getAccessToken)
    const data = yield call(api.getCurrentPayment, token)

    yield put(getCurrentPaymentSuccess(data.data))

  } catch (error) {
    yield put(getCurrentPaymentError(error))
  }
}

function* accountRequestedFlow(action) {
  try {
    const token = yield select(getAccessToken)
    const data = yield call(api.getAccount, token)

    yield put(getAccountSuccess(data.data))

  } catch (error) {
    yield put(getAccountError(error))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* accountWatcher() {
  yield all([
    takeLatest(CURRENT_PAYMENT_REQUESTED, currentPaymentRequestedFlow),
    takeLatest(ACCOUNT_REQUESTED, accountRequestedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const accountSagas = [
  fork(accountWatcher),
]
