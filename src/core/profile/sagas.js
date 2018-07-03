import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import { PROFILE_REQUESTED, PROFILE_UPDATED } from './constants'
import {
  getProfileSuccess, getProfileError,
  updateProfileSuccess, updateProfileError
} from './actions'
import { getAccessToken }         from 'core/user'
import api                        from './api'
import { toastr }                 from 'react-redux-toastr'
import { displayErrors }          from 'utils/custom_services'

function* profileRequestedFlow(action) {
  try {
    const token = yield select(getAccessToken)
    const data = yield call(api.getProfile, token)

    yield put(getProfileSuccess(data))

  } catch (error) {
    yield put(getProfileError(error))
  }
}

function* profileUpdatedFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    const profile = yield call(api.updateAlertPreferences, token, data)

    yield put(updateProfileSuccess(profile))
    toastr.success('Success', 'Your profile has been updated')
  } catch (error) {
    yield put(updateProfileError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* profileWatcher() {
  yield all([
    takeLatest(PROFILE_REQUESTED, profileRequestedFlow),
    takeLatest(PROFILE_UPDATED, profileUpdatedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const profileSagas = [
  fork(profileWatcher),
]
