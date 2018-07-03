import { getResponseData, getResponseDelete, buildBody } from 'core/api/helpers'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/pay_accounts`;
const CARD_ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/cards`;
const BANK_ACCOUNTS_ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/bank_accounts`;

export default {

  getPaymentAccounts: (token) => {
    return fetch(ENDPOINT, {
    	method: 'GET',
    	headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

  createCardAccount: (token, card) => {
    return fetch(CARD_ENDPOINT, {
      method: 'POST',
      body: buildBody('pay_account', card),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

  createBankAccount: (token, bank_account) => {
    return fetch(BANK_ACCOUNTS_ENDPOINT, {
      method: 'POST',
      body: buildBody('pay_account', bank_account),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

  deletePayAccount: (token, id) => {
    return fetch(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseDelete(resp))
  },

  setDefaultAccount: (token, id) => {
    return fetch(`${ENDPOINT}/${id}`, {
      method: 'PATCH',
      body: buildBody('pay_account', {'default': true}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  }
}