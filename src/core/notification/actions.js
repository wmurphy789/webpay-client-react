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

export const getNotifications = () => ({
  type: NOTIFICATIONS_REQUESTED
})

export const getNotificationsSuccess = (data) => ({
  type: NOTIFICATIONS_REQUESTED_SUCCESS,
  data
})

export const getNotificationsError = (data) => ({
  type: NOTIFICATIONS_REQUESTED_ERROR,
  data
})

export const deleteNotification = (id) => ({
  type: NOTIFICATION_DELETED,
  id
})

export const deleteNotificationSuccess = (id) => ({
  type: NOTIFICATION_DELETED_SUCCESS,
  id
})

export const deleteNotificationError = (data) => ({
  type: NOTIFICATION_DELETED_ERROR,
  data
})

export const deleteNotifications = () => ({
  type: NOTIFICATIONS_DELETED
})

export const deleteNotificationsSuccess = () => ({
  type: NOTIFICATIONS_DELETED_SUCCESS
})

export const deleteNotificationsError = (data) => ({
  type: NOTIFICATIONS_DELETED_ERROR,
  data
})
