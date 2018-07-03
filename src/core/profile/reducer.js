import {
  PROFILE_REQUESTED, PROFILE_REQUESTED_SUCCESS, PROFILE_REQUESTED_ERROR,
  PROFILE_UPDATED, PROFILE_UPDATED_SUCCESS, PROFILE_UPDATED_ERROR,
} from './constants'
import { cloneDeep } from 'lodash'

const initial = {
  loading: false,
  data: {}
}

export const profileReducer = (state = initial, action) => {
  switch (action.type) {

    case PROFILE_REQUESTED:
      return { ...state, loading: true }

    case PROFILE_REQUESTED_SUCCESS:
      let profile = cloneDeep(action.data)
      delete profile.attributes
      Object.assign(profile, action.data.data.attributes)
      delete profile.data
      return { ...state, loading: false, data: profile }

    case PROFILE_REQUESTED_ERROR:
      return { ...state, error: action.data }

    case PROFILE_UPDATED:
      return { ...state, loading: true }

    case PROFILE_UPDATED_SUCCESS:
      profile = cloneDeep(action.data)
      delete profile.attributes
      Object.assign(profile, action.data.data.attributes)

      return { ...state, loading: false, data: profile }

    case PROFILE_UPDATED_ERROR:
      return { ...state, error: action.data, loading: false }

    default:
      return state
  }
}
