import { getResponseData } from 'core/api/helpers'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/dates`;

export default {

  getDates: (token, query) => {
    let url = ( query ? `${ENDPOINT}?due_date=${query["end_date"]}` : ENDPOINT )

    return fetch(url, {
    	method: 'GET',
    	headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

}
