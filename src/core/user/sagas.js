import { all, takeLatest, fork, call, put, select, race, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { unsetUser, setUser, receiveLoginError,
         updateUserError, updateUserSuccess,
         registerError, sendRecoveryEmailError,
         updatePasswordError } from './actions'
import { LOGIN_REQUESTED, USER_UNSET, USER_UPDATED,
         REGISTERED, SEND_RECOVERY_EMAIL,
         UPDATE_PASSWORD } from './constants'
import history from 'utils/history'
import apiUser from './api'
import { toastr }                from 'react-redux-toastr'
import { displayErrors }         from 'utils/custom_services'
import { getAccessToken }        from 'core/user'

// Side effects Services
const getAuthToken = () => {
  return JSON.parse(localStorage.getItem('token'))
}

const setAuthToken = (token) => {
  localStorage.setItem('token', JSON.stringify(token))
}

const removeAuthToken = () => {
  localStorage.removeItem('token')
}

function* logout () {
  yield call(removeAuthToken)
  yield put(unsetUser())
  history.push('/login')
  // NOTE: IF SSO
  // history.push('/thank_you')
}

function* refresh(credentialsOrToken) {

  const { response } = yield race({
    response: call(apiUser.refreshToken, credentialsOrToken),
    signout : take(USER_UNSET)
  })

  if (response && response.access_token) {
    yield call(setAuthToken, response)
    yield put(setUser(response))
    return response
  } else {
    yield call(logout)
    return null
  }
}

function* authorize(credentialsOrToken) {
  try {
    const { response } = yield race({
      response: call(apiUser.login, credentialsOrToken),
      signout : take(USER_UNSET)
    })
    if (response && response.access_token) {
      yield call(setAuthToken, response)
      yield put(setUser(response))
      history.push('/');
      return response
    } else {
      yield call(logout)
      return null
    }
  } catch (error) {
    toastr.error('Error', displayErrors(error))
    yield put(receiveLoginError(error))
  }
}

function* regiseredFlow(action) {
  try {
    const { data } = action
    const token = yield call(apiUser.getToken)
    const user = yield call(apiUser.register, data, token['access_token'])

    yield put(setUser(user))
    history.push('/')
    toastr.success('Success', 'Succesfully registerd, a confirmation email has been sent')
  } catch (error) {
    yield put(registerError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

function* userUpdatedFlow(action) {
  try {
    const { data, id } = action
    const token = yield select(getAccessToken)
    const user = yield call(apiUser.userUpdate, token, data, id)

    yield put(updateUserSuccess(user))
    toastr.success('Success', 'Profile updated')

  } catch (error) {
    yield put(updateUserError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

function* sendRecoveryEmailFlow(action) {
  try {
    const { data } = action
    const token = yield call(apiUser.getToken)
    yield call(apiUser.sendRecoveryEmail, data, token['access_token'])

    history.push('/')
    toastr.success('Success', 'Email has been sent')
  } catch (error) {
    yield put(sendRecoveryEmailError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

function* updatePasswordFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    yield call(apiUser.updatePassword, data, token)

    toastr.success('Success', 'Password updated')
  } catch (error) {
    yield put(updatePasswordError(error))
    toastr.error('Error', 'Could not update password at this time')
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* loginWatcher () {
  let token = yield call(getAuthToken)
  console.log("HERE!!!")
  while (true) {
    console.log("HERE!")
    const user = yield take(LOGIN_REQUESTED)
    token = yield call(authorize, user)

    if (!token)
      continue

    let userSignedOut = false
    while(!userSignedOut) {

      const { expired } = yield race({
        expired: call(delay, token.expires_in * 1000),
        signout: take(USER_UNSET)
      })
      if (expired) {
        token = yield call(refresh, token)
        if(!token) {
          userSignedOut = true
          yield call(logout)
        }
      } else {
        userSignedOut = true
        yield call(logout)
      }

    }
  }
}

function* userWatcher() {
  yield all([
    takeLatest(USER_UPDATED, userUpdatedFlow),
    takeLatest(REGISTERED, regiseredFlow),
    takeLatest(SEND_RECOVERY_EMAIL, sendRecoveryEmailFlow),
    takeLatest(UPDATE_PASSWORD, updatePasswordFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const userSagas = [
  fork(loginWatcher),
  fork(userWatcher)
];
