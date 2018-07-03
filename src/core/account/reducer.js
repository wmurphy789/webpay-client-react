import {
  ACCOUNT_REQUESTED, ACCOUNT_REQUESTED_SUCCESS, ACCOUNT_REQUESTED_ERROR,
  CURRENT_PAYMENT_REQUESTED, CURRENT_PAYMENT_REQUESTED_SUCCESS,
  CURRENT_PAYMENT_REQUESTED_ERROR
} from './constants'
import { cloneDeep } from 'lodash'

export const currentPaymentReducer = (state = { loading: false, lines: [] }, action) => {

  switch (action.type) {
    case CURRENT_PAYMENT_REQUESTED:
      return {...state,  loading: true }

    case CURRENT_PAYMENT_REQUESTED_SUCCESS:
      let current_payment = cloneDeep(action.data)
      delete current_payment.attributes
      Object.assign(current_payment, action.data.attributes)

      return {...current_payment, loading: false }

    case CURRENT_PAYMENT_REQUESTED_ERROR:
      return { ...state, error: action.data }

    default:
      return state
  }
}

export const accountReducer = (state = { loading: false, payment_amount: 0 }, action) => {

  switch (action.type) {

    case ACCOUNT_REQUESTED:
      return { ...state, loading: true }

    case ACCOUNT_REQUESTED_SUCCESS:
      let account = cloneDeep(action.data)
      delete account.attributes
      Object.assign(account, action.data.attributes)

      return { ...account, loading: false }

    case ACCOUNT_REQUESTED_ERROR:
      return { ...state, error: action.data }

    default:
      return state
  }
}
