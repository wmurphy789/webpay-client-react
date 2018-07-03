import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import {
  recurringPaymentsCreateSuccess, recurringPaymentsCreateError,
  recurringPaymentsDeleteSuccess, recurringPaymentsDeleteError,
  recurringPaymentsRequestSuccess, recurringPaymentsRequestError,
  recurringPaymentsUpdateSuccess, recurringPaymentsUpdateError
} from './actions'
import {
  RECURRING_PAYMENT_CREATED,
  RECURRING_PAYMENT_UPDATED,
  RECURRING_PAYMENT_DELETED,
  RECURRING_PAYMENT_REQUESTED
} from './constants'
import { getAccessToken } from 'core/user'
import { toastr } from 'react-redux-toastr'
import { displayErrors } from 'utils/custom_services'
import api from './api'
import history from 'utils/history'

function* recurringPaymentCreatedFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    const recurringPayment = yield call(api.createRecurringPayment, token, data)

    yield put(recurringPaymentsCreateSuccess(recurringPayment))

    history.push('/recurring_payments')
    toastr.success('Success', 'Created a new recurring payment')

  } catch (error) {
    yield put(recurringPaymentsCreateError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

function* recurringPaymentUpdatedFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    const recurringPayment = yield call(api.updateRecurringPayment, token, data)

    yield put(recurringPaymentsUpdateSuccess(recurringPayment))

    history.push('/recurring_payments')
    toastr.success('Success', 'Updated the recurring payment')

  } catch (error) {
    yield put(recurringPaymentsUpdateError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

function* recurringPaymentDeletedFlow(action) {
  try {
    const { id } = action
    const token = yield select(getAccessToken)
    yield call(api.deleteRecurringPayment, token, id)

    yield put(recurringPaymentsDeleteSuccess(id))

    history.push('/recurring_payments')
    toastr.success('Success', 'Deleted the recurring payment')

  } catch (error) {
    yield put(recurringPaymentsDeleteError(error))
    toastr.error('Error', displayErrors(error.errors), { allowHtml: true })
  }
}

function* recurringPaymentRequestedFlow(action) {
  try {
    const token = yield select(getAccessToken)
    const data = yield call(api.getRecurringPayments, token)

    yield put(recurringPaymentsRequestSuccess(data))

  } catch (error) {
    yield put(recurringPaymentsRequestError(error))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* recurringPaymentWatcher() {
  yield all([
    takeLatest(RECURRING_PAYMENT_CREATED, recurringPaymentCreatedFlow),
    takeLatest(RECURRING_PAYMENT_DELETED, recurringPaymentDeletedFlow),
    takeLatest(RECURRING_PAYMENT_REQUESTED, recurringPaymentRequestedFlow),
    takeLatest(RECURRING_PAYMENT_UPDATED, recurringPaymentUpdatedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const recurringPaymentSagas = [
  fork(recurringPaymentWatcher),
];
