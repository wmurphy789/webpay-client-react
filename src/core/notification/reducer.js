import {
  NOTIFICATIONS_REQUESTED,
  NOTIFICATIONS_REQUESTED_SUCCESS,
  NOTIFICATIONS_REQUESTED_ERROR,
  NOTIFICATIONS_DELETED,
  NOTIFICATIONS_DELETED_SUCCESS,
  NOTIFICATIONS_DELETED_ERROR,
  NOTIFICATION_DELETED,
  NOTIFICATION_DELETED_SUCCESS,
  NOTIFICATION_DELETED_ERROR
} from './constants'
import { findIndex } from 'lodash'

export const notificationReducer = (state = {
  data: [],
  loading: false
}, action) => {
  let index;

  switch (action.type) {

    case NOTIFICATIONS_REQUESTED:
      return { ...state, loading: true }

    case NOTIFICATIONS_REQUESTED_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data.data.map((e) => {
          let ret = {...e, ...e.attributes}
          delete ret.attributes
          return ret
        })
      }

    case NOTIFICATIONS_REQUESTED_ERROR:
      return { ...state, error: action.data }

    case NOTIFICATION_DELETED:
      return { ...state, loading: true }

    case NOTIFICATION_DELETED_SUCCESS:
      index = findIndex(state.data, (o) => o.id === action.id)

      return {
        ...state,
        loading: false,
        data: [
          ...state.data.slice(0, index),
          ...state.data.slice(index + 1)
        ]
      }

    case NOTIFICATION_DELETED_ERROR:
      return { ...state, error: action.data, loading: false }

    case NOTIFICATIONS_DELETED:
      return { ...state, loading: true }

    case NOTIFICATIONS_DELETED_SUCCESS:
      return {
        ...state,
        loading: false,
        data: []
      }

    case NOTIFICATIONS_DELETED_ERROR:
      return { ...state, error: action.data, loading: false }

    default:
      return state
  }
}
