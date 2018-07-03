import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import { PAYMENT_CREATED, PAYMENTS_REQUESTED } from './constants'
import {
  getPaymentsSuccess, getPaymentsError,
  createPaymentSuccess, createPaymentError
} from './actions'
import { getAccessToken } from 'core/user'
import api from './api'
import { toastr }                from 'react-redux-toastr'
import { displayErrors }         from 'utils/custom_services'
import history                   from 'utils/history'

function* paymentCreatedFlow(action) {
  try {
    const { data } = action

    data.lines.forEach((item, index) => {
      let name = item.item_name
      data[name] = item.amount
    });

    delete data["lines"];

    const token = yield select(getAccessToken)
    const payment = yield call(api.createPayment, token, data)

    yield put(createPaymentSuccess(payment))
    history.push('/payment_success')
    toastr.success('Success', 'Payment made')

  } catch (error) {
    toastr.error('Error', displayErrors(error.errors))
    yield put(createPaymentError(error))
  }
}


function* paymentsRequestedFlow(action) {
  try {
    const { query } = action
    const token = yield select(getAccessToken)
    const data = yield call(api.getPayments, token, query)

    yield put(getPaymentsSuccess(data))

  } catch (error) {
    yield put(getPaymentsError(error))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* paymentWatcher() {
  yield all([
    takeLatest(PAYMENT_CREATED, paymentCreatedFlow),
    takeLatest(PAYMENTS_REQUESTED, paymentsRequestedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const paymentSagas = [
  fork(paymentWatcher),
]
