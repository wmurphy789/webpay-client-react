import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import { PAY_ACCOUNTS_REQUESTED, CREATE_CARD, CREATE_BANK, PAY_ACCOUNT_DELETED,
         SET_DEFAULT_ACCOUNT} from './constants'
import {
  getPaymentAccountsSuccess, getPaymentAccountsError,
  createPayAccountSuccess, createPayAccountError,
  deletePayAccountSuccess, deletePayAccountError,
  setDefaultAccountSuccess, setDefaultAccountError
} from './actions'
import { getAccessToken }        from 'core/user'
import api                       from './api'
import { toastr }                from 'react-redux-toastr'
import { displayErrors }         from 'utils/custom_services'

function* payAccountRequestedFlow(action) {
  try {
    const token = yield select(getAccessToken)
    const data = yield call(api.getPaymentAccounts, token)

    yield put(getPaymentAccountsSuccess(data))
  } catch (error) {
    yield put(getPaymentAccountsError(error))
  }
}

function* createCardFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    const card = yield call(api.createCardAccount, token, data)

    yield put(createPayAccountSuccess(card))
    toastr.success('Success', 'Created a new pay account')
  } catch (error) {
    yield put(createPayAccountError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

function* createBankFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    const card = yield call(api.createBankAccount, token, data)

    yield put(createPayAccountSuccess(card))
    toastr.success('Success', 'Created a new pay account')
  } catch (error) {
    yield put(createPayAccountError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

function* deletePayAccountFlow(action) {
  try {
    const { id } = action
    const token = yield select(getAccessToken)
    yield call(api.deletePayAccount, token, id)

    yield put(deletePayAccountSuccess(id))
    toastr.success('Success', 'Deleted the pay account')
  } catch (error) {
    yield put(deletePayAccountError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

function* setDefaultAccountFlow(action) {
  try {
    const { id } = action
    const token = yield select(getAccessToken)
    yield call(api.setDefaultAccount, token, id)

    yield put(setDefaultAccountSuccess(id))
    toastr.success('Success', 'Set pay account to default')
  } catch (error) {
    yield put(setDefaultAccountError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* payAccountWatcher() {
  yield all([
    takeLatest(PAY_ACCOUNTS_REQUESTED, payAccountRequestedFlow),
    takeLatest(CREATE_CARD, createCardFlow),
    takeLatest(CREATE_BANK, createBankFlow),
    takeLatest(PAY_ACCOUNT_DELETED, deletePayAccountFlow),
    takeLatest(SET_DEFAULT_ACCOUNT, setDefaultAccountFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const payAccountSagas = [
  fork(payAccountWatcher),
]
