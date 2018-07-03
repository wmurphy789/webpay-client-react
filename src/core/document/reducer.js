import {
  DOCUMENTS_REQUESTED,
  DOCUMENTS_REQUESTED_SUCCESS,
  DOCUMENTS_REQUESTED_ERROR,
} from './constants'

const initial = {
  data: [],
  loading: false
}

export const documentReducer = (state = initial, action) => {
  switch (action.type) {

    case DOCUMENTS_REQUESTED:
      return {...state, loading: true }

    case DOCUMENTS_REQUESTED_SUCCESS:
      return {
        ...state,
        loading : false,
        data: action.data.data.map((e) => {
          let ret = {...e,...e.attributes}
          delete ret.attributes
          return ret
        }),
        meta: action.data.meta
      }

    case DOCUMENTS_REQUESTED_ERROR:
      return { ...state, error: action.data }

    default:
      return state
  }
}
