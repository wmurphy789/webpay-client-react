import {
  RECURRING_PAYMENT_REQUESTED, RECURRING_PAYMENT_REQUESTED_SUCCESS, RECURRING_PAYMENT_REQUESTED_ERROR,
  RECURRING_PAYMENT_CREATED, RECURRING_PAYMENT_CREATED_SUCCESS, RECURRING_PAYMENT_CREATED_ERROR,
  RECURRING_PAYMENT_DELETED, RECURRING_PAYMENT_DELETED_SUCCESS, RECURRING_PAYMENT_DELETED_ERROR,
  RECURRING_PAYMENT_UPDATED, RECURRING_PAYMENT_UPDATED_SUCCESS, RECURRING_PAYMENT_UPDATED_ERROR,
} from './constants'

export const getRecurringPayments = () => ({
  type: RECURRING_PAYMENT_REQUESTED
})

export const recurringPaymentsRequestSuccess = (data) => ({
  type: RECURRING_PAYMENT_REQUESTED_SUCCESS,
  data
})

export const recurringPaymentsRequestError = (error) => ({
  type: RECURRING_PAYMENT_REQUESTED_ERROR,
  error
})

export const createRecurringPayment = (data) => ({
  type: RECURRING_PAYMENT_CREATED,
  data
})

export const recurringPaymentsCreateSuccess = (data) => ({
  type: RECURRING_PAYMENT_CREATED_SUCCESS,
  data
})

export const recurringPaymentsCreateError = (error) => ({
  type: RECURRING_PAYMENT_CREATED_ERROR,
  error
})

export const updateRecurringPayment = (data) => ({
  type: RECURRING_PAYMENT_UPDATED,
  data
})

export const recurringPaymentsUpdateSuccess = (data) => ({
  type: RECURRING_PAYMENT_UPDATED_SUCCESS,
  data
})

export const recurringPaymentsUpdateError = (error) => ({
  type: RECURRING_PAYMENT_UPDATED_ERROR,
  error
})

export const deleteRecurringPayment = (id) => ({
  type: RECURRING_PAYMENT_DELETED,
  id
})

export const recurringPaymentsDeleteSuccess = (id) => ({
  type: RECURRING_PAYMENT_DELETED_SUCCESS,
  id
})

export const recurringPaymentsDeleteError = (error) => ({
  type: RECURRING_PAYMENT_DELETED_ERROR,
  error
})
