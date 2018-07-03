import {
  PROFILE_REQUESTED, PROFILE_REQUESTED_SUCCESS, PROFILE_REQUESTED_ERROR,
  PROFILE_UPDATED, PROFILE_UPDATED_SUCCESS, PROFILE_UPDATED_ERROR,
} from './constants'

export const getProfile = () => ({
  type: PROFILE_REQUESTED
})

export const getProfileSuccess = (data) => ({
  type: PROFILE_REQUESTED_SUCCESS,
  data
})

export const getProfileError = (data) => ({
  type: PROFILE_REQUESTED_ERROR,
  data
})

export const updateAlertPreferences = (data) => ({
  type: PROFILE_UPDATED,
  data
})

export const updateProfileSuccess = (data) => ({
  type: PROFILE_UPDATED_SUCCESS,
  data
})

export const updateProfileError = (data) => ({
  type: PROFILE_UPDATED_ERROR,
  data
})