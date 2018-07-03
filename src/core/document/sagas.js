import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import { DOCUMENTS_REQUESTED } from './constants'
import { getDocumentsSuccess, getDocumentsError } from './actions'
import { getAccessToken } from 'core/user'
import api from './api'

function* documentRequestedFlow(action) {
  try {
    const { query } = action
    const token = yield select(getAccessToken)
    const data = yield call(api.getDocuments, token, query)
    yield put(getDocumentsSuccess(data))

  } catch (error) {
    yield put(getDocumentsError(error))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* documentWatcher() {
  yield all([
    takeLatest(DOCUMENTS_REQUESTED, documentRequestedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const documentSagas = [
  fork(documentWatcher),
]
