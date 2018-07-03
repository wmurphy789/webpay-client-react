import {
  MESSAGES_REQUESTED,
  MESSAGES_REQUESTED_SUCCESS,
  MESSAGES_REQUESTED_ERROR,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_CREATE_ERROR,
  CREATE_MESSAGE,
} from './constants'
import { findIndex, cloneDeep } from 'lodash'

export const messageReducer = (state = {
  data: [],
  loading: false
}, action) => {
  let index;

  switch (action.type) {

    case MESSAGES_REQUESTED:
      return { ...state, loading: true }

    case MESSAGES_REQUESTED_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data.data.map((e) => {
          let ret = {...e, ...e.attributes}
          delete ret.attributes
          return ret
        })
      }

    case MESSAGES_REQUESTED_ERROR:
      return { ...state, error: action.data }

    case CREATE_MESSAGE:
      return { ...state, loading: true }

    case MESSAGE_CREATE_SUCCESS:
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

      return { ...state, data: newData, loading: false }

    case MESSAGE_CREATE_ERROR:
      return { ...state, error: action, loading: false }

    default:
      return state
  }
}
