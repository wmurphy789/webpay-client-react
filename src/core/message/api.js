import { getResponseData, getFileData, buildBody } from 'core/api/helpers'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/secure_messages`;

export default {

  getMessages: (token) => {
    return fetch(ENDPOINT, {
    	method: 'GET',
    	headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

  createMessage: (token, message) => {
    return fetch(ENDPOINT, {
      method: 'POST',
      body: getFileData(message),
      headers: {
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  }
}
