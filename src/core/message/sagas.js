import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import { MESSAGES_REQUESTED, CREATE_MESSAGE } from './constants'
import {
  getMessagesSuccess, getMessagesError,
  createMessageSuccess, createMessageError,
} from './actions'
import { getAccessToken }        from 'core/user'
import api                       from './api'
import { toastr }                from 'react-redux-toastr'
import { displayErrors }         from 'utils/custom_services'

function* messageRequestedFlow(action) {
  try {
    const token = yield select(getAccessToken)
    const data = yield call(api.getMessages, token)

    yield put(getMessagesSuccess(data))
  } catch (error) {
    yield put(getMessagesError(error))
  }
}

function* createMessageFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    const message = yield call(api.createMessage, token, data)

    yield put(createMessageSuccess(message))
    toastr.success('Success', 'Message Sent')
  } catch (error) {
    yield put(createMessageError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* messageWatcher() {
  yield all([
    takeLatest(MESSAGES_REQUESTED, messageRequestedFlow),
    takeLatest(CREATE_MESSAGE, createMessageFlow),
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const messageSagas = [
  fork(messageWatcher),
]
