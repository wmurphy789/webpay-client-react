import { findIndex } from 'lodash'
import {
  RECURRING_PAYMENT_REQUESTED, RECURRING_PAYMENT_REQUESTED_SUCCESS, RECURRING_PAYMENT_REQUESTED_ERROR,
  RECURRING_PAYMENT_CREATED, RECURRING_PAYMENT_CREATED_SUCCESS, RECURRING_PAYMENT_CREATED_ERROR,
  RECURRING_PAYMENT_DELETED, RECURRING_PAYMENT_DELETED_SUCCESS, RECURRING_PAYMENT_DELETED_ERROR,
  RECURRING_PAYMENT_UPDATED, RECURRING_PAYMENT_UPDATED_SUCCESS, RECURRING_PAYMENT_UPDATED_ERROR,
} from './constants'

const initial = {
  data: [],
  loading: false,
}

export const recurringPaymentReducer = (state = initial, action) => {
  let index = 0

  switch (action.type) {

    case RECURRING_PAYMENT_REQUESTED:
      return { ...state, loading: true }

    case RECURRING_PAYMENT_REQUESTED_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data.data.map((e) => {
          let rp = {...e, ...e.attributes}
          delete rp.attributes
          return rp
        })
      }

    case RECURRING_PAYMENT_REQUESTED_ERROR:
      return { ...state, error: action.error }

    case RECURRING_PAYMENT_UPDATED:
      return { ...state, loading: true }

    case RECURRING_PAYMENT_UPDATED_SUCCESS:
      let actiondata = {...action.data.data, ...action.data.data.attributes},
        found = false,
        newData

      delete actiondata.attributes

      for (var i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.data.id) {
          found = true
          index = i
        }
      }
      if (found) {
        newData = [
          ...state.data.slice(0, index),
          actiondata,
          ...state.data.slice(index + 1)
        ]
      }
      else {
        newData = state.data.concat(actiondata)
      }

      return { ...state, data: newData }

    case RECURRING_PAYMENT_UPDATED_ERROR:
      return { ...state, error : action.error }

    case RECURRING_PAYMENT_CREATED:
      return { ...state, loading: true }

    case RECURRING_PAYMENT_CREATED_SUCCESS:
      let updatedata = {...action.data.data, ...action.data.data.attributes},
        update_found = false,
        update_newData

      delete updatedata.attributes

      for (i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.data.id) {
          update_found = true
          index = i
        }
      }
      if (update_found) {
        update_newData = [
          ...state.data.slice(0, index),
          updatedata,
          ...state.data.slice(index + 1)
        ]
      }
      else {
        update_newData = state.data.concat(updatedata)
      }

      return { ...state, data: update_newData }

    case RECURRING_PAYMENT_CREATED_ERROR:
      return { ...state, error : action.error }

    case RECURRING_PAYMENT_DELETED:
      return { ...state, loading: true }

    case RECURRING_PAYMENT_DELETED_SUCCESS:
      index = findIndex(state.data, (o) => o.id === action.id)

      return {
        ...state,
        loading: false,
        data: [
          ...state.data.slice(0, index),
          ...state.data.slice(index + 1)
        ]
      }

    case RECURRING_PAYMENT_DELETED_ERROR:
      return { ...state, error: action.error }

    default:
      return state
  }
}
