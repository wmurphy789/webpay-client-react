import { all, takeLatest, fork, call, put, select }       from 'redux-saga/effects'
import { NOTIFICATIONS_REQUESTED, NOTIFICATIONS_DELETED,
         NOTIFICATION_DELETED }                           from './constants'
import {
  getNotificationsSuccess, getNotificationsError,
  deleteNotificationSuccess, deleteNotificationError,
  deleteNotificationsSuccess, deleteNotificationsError
} from './actions'
import { getAccessToken }                   from 'core/user'
import api                                  from './api'
import { toastr }                           from 'react-redux-toastr'
import { displayErrors }                    from 'utils/custom_services'

function* notificationsRequestedFlow(action) {
  try {
    const token = yield select(getAccessToken)
    const data = yield call(api.getNotifications, token)

    yield put(getNotificationsSuccess(data))
  } catch (error) {
    yield put(getNotificationsError(error))
  }
}

function* deleteNotificationFlow(action) {
  try {
    const { id } = action
    const token = yield select(getAccessToken)
    yield call(api.deleteNotification, token, id)

    yield put(deleteNotificationSuccess(id))
    // toastr.success('Success', 'Deleted the notification')
  } catch (error) {
    yield put(deleteNotificationError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

function* deleteNotificationsFlow(action) {
  try {
    const token = yield select(getAccessToken)
    yield call(api.deleteNotifications, token)

    yield put(deleteNotificationsSuccess())
    toastr.success('Success', 'Deleted all notifications')
  } catch (error) {
    yield put(deleteNotificationsError(error))
    toastr.error('Error', displayErrors(error.errors))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* notificationWatcher() {
  yield all([
    takeLatest(NOTIFICATIONS_REQUESTED, notificationsRequestedFlow),
    takeLatest(NOTIFICATION_DELETED, deleteNotificationFlow),
    takeLatest(NOTIFICATIONS_DELETED, deleteNotificationsFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const notificationSagas = [
  fork(notificationWatcher),
]
