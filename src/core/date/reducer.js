import {
  DATES_REQUESTED,
  DATES_REQUESTED_SUCCESS,
  DATES_REQUESTED_ERROR,
} from './constants'

const initial = {
  data: [],
  loading: false
}

export const dateReducer = (state = initial, action) => {
  switch (action.type) {

    case DATES_REQUESTED:
      return {...state, loading: true }

    case DATES_REQUESTED_SUCCESS:
      return {
        ...state,
        loading : false,
        data: action.data
      }

    case DATES_REQUESTED_ERROR:
      return {
        ...state,
        data: {
          "data": {
            "disabled_dates": []
          }
        },
        loading : false,
        error: action.data
      }

    default:
      return state
  }
}
