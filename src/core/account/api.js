import fetch from 'isomorphic-fetch'
import { getResponseData } from 'core/api/helpers'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/loans`;

export default {

  getAccount: (token) => {
    return fetch(ENDPOINT, {
    	method: 'GET',
    	headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

  getCurrentPayment: (token) => {
    return fetch(`${ENDPOINT}/current_payment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  }
}
