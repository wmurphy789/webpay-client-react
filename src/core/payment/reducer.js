import {
  PAYMENTS_REQUESTED, PAYMENTS_REQUESTED_SUCCESS, PAYMENTS_REQUESTED_ERROR,
  PAYMENT_CREATED, PAYMENT_CREATED_SUCCESS, PAYMENT_CREATED_ERROR
} from './constants'
import { cloneDeep } from 'lodash'

const initial = {
  data: [],
  loading: false,
  paymentCreating: false,
  paymentTracking: null
}

export const paymentReducer = (state = initial, action) => {
  switch (action.type) {

    case PAYMENTS_REQUESTED:
      return { ...state, loading: true, data: [] }

    case PAYMENTS_REQUESTED_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data.data.map((e) => {
          let ret = {...e,...e.attributes}
          delete ret.attributes
          return ret
        }),
        meta: action.data.meta
      }

    case PAYMENTS_REQUESTED_ERROR:
      return { ...state, error: action.data, loading: false }

    case PAYMENT_CREATED:
      return {...state, paymentCreating: true , loading: true }

    case PAYMENT_CREATED_SUCCESS:
      let paymentTracking = cloneDeep(action.data.data)
      delete paymentTracking.type
      Object.assign(paymentTracking, action.data.data.attributes)

      return { ...state, paymentCreating: false, paymentTracking: paymentTracking, loading: false }

    case PAYMENT_CREATED_ERROR:
      return { ...state, paymentCreating: false, loading: false }

    default:
      return state
  }
}
