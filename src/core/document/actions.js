import {
  DOCUMENTS_REQUESTED,
  DOCUMENTS_REQUESTED_SUCCESS,
  DOCUMENTS_REQUESTED_ERROR,
} from './constants'

export const getDocuments = (query) => ({
  type: DOCUMENTS_REQUESTED,
  query
})

export const getDocumentsSuccess = (data) => ({
  type: DOCUMENTS_REQUESTED_SUCCESS,
  data
})

export const getDocumentsError = (data) => ({
  type: DOCUMENTS_REQUESTED_ERROR,
  data
})
