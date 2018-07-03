import {
  ACCOUNT_REQUESTED, ACCOUNT_REQUESTED_SUCCESS, ACCOUNT_REQUESTED_ERROR,
  CURRENT_PAYMENT_REQUESTED, CURRENT_PAYMENT_REQUESTED_SUCCESS,
  CURRENT_PAYMENT_REQUESTED_ERROR
} from './constants'

export const getAccount = () => ({
  type: ACCOUNT_REQUESTED
})

export const getAccountSuccess = (data) => ({
  type: ACCOUNT_REQUESTED_SUCCESS,
  data
})

export const getAccountError = (data) => ({
  type: ACCOUNT_REQUESTED_ERROR,
  data
})

export const getCurrentPayment = () => ({
  type: CURRENT_PAYMENT_REQUESTED
})

export const getCurrentPaymentSuccess = (data) => ({
  type: CURRENT_PAYMENT_REQUESTED_SUCCESS,
  data
})

export const getCurrentPaymentError = (data) => ({
  type: CURRENT_PAYMENT_REQUESTED_ERROR,
  data
})
