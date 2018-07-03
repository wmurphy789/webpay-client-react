import {
  PAYMENTS_REQUESTED, PAYMENTS_REQUESTED_SUCCESS, PAYMENTS_REQUESTED_ERROR,
  PAYMENT_CREATED, PAYMENT_CREATED_SUCCESS, PAYMENT_CREATED_ERROR,
} from './constants'

export const createPayment = (data) => ({
  type: PAYMENT_CREATED,
  data
})

export const createPaymentSuccess = (data) => ({
  type: PAYMENT_CREATED_SUCCESS,
  data
})

export const createPaymentError = (data) => ({
  type: PAYMENT_CREATED_ERROR,
  data
})

export const getPayments = (query) => ({
  type: PAYMENTS_REQUESTED,
  query
})

export const getPaymentsSuccess = (data) => ({
  type: PAYMENTS_REQUESTED_SUCCESS,
  data
})

export const getPaymentsError = (data) => ({
  type: PAYMENTS_REQUESTED_ERROR,
  data
})
