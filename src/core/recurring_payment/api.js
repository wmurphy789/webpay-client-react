import { getResponseData, getResponseDelete, buildBody} from 'core/api/helpers'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/recurring_payments`;

export default {

  getRecurringPayments: (token) => {
    return fetch(ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

  deleteRecurringPayment: (token, id) => {
    return fetch(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseDelete(resp))
  },

  createRecurringPayment: (token, recurring_payment) => {
    return fetch(ENDPOINT, {
      method: 'POST',
      body: buildBody('recurring_payment', recurring_payment),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

  updateRecurringPayment: (token, recurring_payment) => {
    return fetch(`${ENDPOINT}/${recurring_payment.id}`, {
      method: 'PUT',
      body: buildBody('recurring_payment', recurring_payment),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  }
}
