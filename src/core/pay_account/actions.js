import {
  PAY_ACCOUNTS_REQUESTED,
  PAY_ACCOUNTS_REQUESTED_SUCCESS,
  PAY_ACCOUNTS_REQUESTED_ERROR,
  SET_CURRENT_PAY_ACCOUNT,
  PAY_ACCOUNT_DELETED,
  PAY_ACCOUNT_DELETED_SUCCESS,
  PAY_ACCOUNT_DELETED_ERROR,
  PAY_ACCOUNT_CREATE_SUCCESS,
  PAY_ACCOUNT_CREATE_ERROR,
  CREATE_CARD,
  CREATE_BANK,
  SET_DEFAULT_ACCOUNT,
  SET_DEFAULT_ACCOUNT_SUCCESS,
  SET_DEFAULT_ACCOUNT_ERROR
} from './constants'

export const getPaymentAccounts = () => ({
  type: PAY_ACCOUNTS_REQUESTED
})

export const getPaymentAccountsSuccess = (data) => ({
  type: PAY_ACCOUNTS_REQUESTED_SUCCESS,
  data
})

export const getPaymentAccountsError = (data) => ({
  type: PAY_ACCOUNTS_REQUESTED_ERROR,
  data
})

export const createPayAccountSuccess = (data) => ({
  type: PAY_ACCOUNT_CREATE_SUCCESS,
  data
})

export const createPayAccountError = (data) => ({
  type: PAY_ACCOUNT_CREATE_ERROR,
  data
})

const setCurrentPayAccount = (data) => ({
  type: SET_CURRENT_PAY_ACCOUNT,
  data
})

export const deletePayAccount = (id) => ({
  type: PAY_ACCOUNT_DELETED,
  id
})

export const deletePayAccountSuccess = (id) => ({
  type: PAY_ACCOUNT_DELETED_SUCCESS,
  id
})

export const deletePayAccountError = (data) => ({
  type: PAY_ACCOUNT_DELETED_ERROR,
  data
})

export const createCardAccount = (data) => ({
  type: CREATE_CARD,
  data
})

export const createBankAccount = (data) => ({
  type: CREATE_BANK,
  data
})

export const setDefaultAccount = (id) => ({
  type: SET_DEFAULT_ACCOUNT,
  id
})

export const setDefaultAccountSuccess = (id) => ({
  type: SET_DEFAULT_ACCOUNT_SUCCESS,
  id
})

export const setDefaultAccountError = (data) => ({
  type: SET_DEFAULT_ACCOUNT_ERROR,
  data
})

export const updateCurrentPayAccount = (pay_account) => (dispatch) => {
  return dispatch(setCurrentPayAccount(pay_account))
}

export const changeCurrentPayAccount = (event) => (dispatch, getState) => {
  if(event.target) {
    let index = event.target.options.selectedIndex - 1
    let pay_accounts = getState().pay_account.data
    let current_pay_account = pay_accounts[index]

    return dispatch(setCurrentPayAccount(current_pay_account))
  }
}
