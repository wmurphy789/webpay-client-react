import {
  SET_CURRENT_PAY_ACCOUNT,
  PAY_ACCOUNTS_REQUESTED,
  PAY_ACCOUNTS_REQUESTED_SUCCESS,
  PAY_ACCOUNTS_REQUESTED_ERROR,
  PAY_ACCOUNT_DELETED,
  PAY_ACCOUNT_DELETED_SUCCESS,
  PAY_ACCOUNT_DELETED_ERROR,
  SET_DEFAULT_ACCOUNT,
  SET_DEFAULT_ACCOUNT_SUCCESS,
  SET_DEFAULT_ACCOUNT_ERROR,
  PAY_ACCOUNT_CREATE_SUCCESS,
  PAY_ACCOUNT_CREATE_ERROR,
  CREATE_CARD,
  CREATE_BANK
} from './constants'
import { findIndex, cloneDeep } from 'lodash'

export const currentPayAccountReducer = (state = {}, action) => {
  switch (action.type) {

    case SET_CURRENT_PAY_ACCOUNT:
      let current_pay_account

      if(action.data) {
        current_pay_account = cloneDeep(action.data)
        delete current_pay_account.attributes
        Object.assign(current_pay_account, action.data.attributes)
      } else {
        Object.assign(current_pay_account, action)
      }

      return Object.assign({}, state, current_pay_account)

    default:
      return state
  }
}

export const payAccountReducer = (state = {
  data: [],
  loading: false
}, action) => {
  let index;

  switch (action.type) {

    case PAY_ACCOUNTS_REQUESTED:
      return { ...state, loading: true }

    case PAY_ACCOUNTS_REQUESTED_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data.data.map((e) => {
          let ret = {...e, ...e.attributes}
          delete ret.attributes
          return ret
        })
      }

    case PAY_ACCOUNTS_REQUESTED_ERROR:
      return { ...state, error: action.data }

    case CREATE_CARD:
      return { ...state, loading: true }

    case CREATE_BANK:
      return { ...state, loading: true }

    case PAY_ACCOUNT_CREATE_SUCCESS:
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

    case PAY_ACCOUNT_CREATE_ERROR:
      return { ...state, error: action }

    case PAY_ACCOUNT_DELETED:
      return { ...state, loading: true }

    case PAY_ACCOUNT_DELETED_SUCCESS:
      index = findIndex(state.data, (o) => o.id === action.id)

      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          ...state.data.slice(index + 1)
        ]
      }

    case PAY_ACCOUNT_DELETED_ERROR:
      return { ...state, error: action.data }

    case SET_DEFAULT_ACCOUNT:
      return { ...state, loading: true }

    case SET_DEFAULT_ACCOUNT_SUCCESS:
      index = findIndex(state.data, (o) => o.id === action.id)

      return {
        ...state,
        data: state.data.map((payAccount, i) => {
          if (i !== index) {
            return { ...payAccount, default: false }
          }

          return { ...payAccount, default: true }
        })
      }
    case SET_DEFAULT_ACCOUNT_ERROR:
      return { ...state, error: action.data }

    default:
      return state
  }
}
