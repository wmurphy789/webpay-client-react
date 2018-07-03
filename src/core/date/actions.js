import {
  DATES_REQUESTED,
  DATES_REQUESTED_SUCCESS,
  DATES_REQUESTED_ERROR,
} from './constants'

export const getDates = (query) => ({
  type: DATES_REQUESTED,
  query
})

export const getDatesSuccess = (data) => ({
  type: DATES_REQUESTED_SUCCESS,
  data
})

export const getDatesError = (data) => ({
  type: DATES_REQUESTED_ERROR,
  data
})
