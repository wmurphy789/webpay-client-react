import { getResponseData, buildBody } from 'core/api/helpers'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/payments`;

export default {
  getPayments: (token, query) => {
    let query_string = ''

    if(query) {
      query_string = `page_number=${"page_number" in query ? query["page_number"] : 1 }`
    }

    let url = ( query ? `${ENDPOINT}/?${query_string}` : ENDPOINT )

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`,
      }
    })
    .then(resp => getResponseData(resp))
  },

  createPayment: (token, payment) => {
    return fetch(ENDPOINT, {
      method: 'POST',
      body: buildBody('payment', payment),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`,
      }
    })
    .then(resp => getResponseData(resp))
  }

}
