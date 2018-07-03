import { getResponseData, getResponseDelete } from 'core/api/helpers'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/notifications`;

export default {

  getNotifications: (token) => {
    return fetch(ENDPOINT, {
    	method: 'GET',
    	headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

  deleteNotification: (token, id) => {
    return fetch(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseDelete(resp))
  },

  deleteNotifications: (token) => {
    return fetch(`${ENDPOINT}/destroy_all`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseDelete(resp))
  }
}
