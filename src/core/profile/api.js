import { getResponseData, buildBody } from 'core/api/helpers'
const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/notification_preferences`;

export default {

  getProfile: (token) => {
    return fetch(ENDPOINT, {
    	method: 'GET',
    	headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

  updateAlertPreferences: (token, profile) => {
    return fetch(ENDPOINT, {
      method: 'PATCH',
      body: buildBody('notification_preferences', profile),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  }

}
