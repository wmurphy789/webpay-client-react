import {
  MESSAGES_REQUESTED,
  MESSAGES_REQUESTED_SUCCESS,
  MESSAGES_REQUESTED_ERROR,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_CREATE_ERROR,
  CREATE_MESSAGE,
} from './constants'

export const getMessages = () => ({
  type: MESSAGES_REQUESTED
})

export const getMessagesSuccess = (data) => ({
  type: MESSAGES_REQUESTED_SUCCESS,
  data
})

export const getMessagesError = (data) => ({
  type: MESSAGES_REQUESTED_ERROR,
  data
})

export const createMessage = (data) => ({
  type: CREATE_MESSAGE,
  data
})

export const createMessageSuccess = (data) => ({
  type: MESSAGE_CREATE_SUCCESS,
  data
})

export const createMessageError = (data) => ({
  type: MESSAGE_CREATE_ERROR,
  data
})
