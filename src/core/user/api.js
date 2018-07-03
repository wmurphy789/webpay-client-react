import fetch from 'isomorphic-fetch'
import {getResponseData, getRegisterFormData, buildBody, getPasswordFormData} from 'core/api/helpers'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/users`;
const AUTH_ENDPOINT = `${process.env.REACT_APP_AUTH_URL}/oauth/token`
const SSO_ENDPOINT = process.env.REACT_APP_AUTH_URL
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const SECRET = process.env.REACT_APP_CLIENT_SECRET

export default {
  // NOTE: REMOVE IF NOT SSO CLIENT
  // login: ({user: { loan_number, ssn, zip }}) => {
  //   return fetch(`${SSO_ENDPOINT}/sso/session`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       grant_type: 'password',
  //       client_id: CLIENT_ID,
  //       client_secret: SECRET,
  //       account_number: loan_number,
  //       zip: zip,
  //       ssn: ssn
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(resp => getResponseData(resp))
  // },

  login: ({user: { username, password }}) => {
    return fetch(AUTH_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'password',
        client_id: CLIENT_ID,
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  register: (user, token) => {
    return fetch(ENDPOINT, {
      method: 'POST',
      body: buildBody('user', user),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  updatePassword: (passwords, token) => {
    return fetch(`${ENDPOINT}/update_password`, {
      method: 'PATCH',
      body: buildBody("user", passwords),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  refreshToken: ({refresh_token}) => {
    return fetch(AUTH_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  userUpdate: (token, user, id) => {
    return fetch(`${ENDPOINT}/${id}`, {
      method: 'PATCH',
      body: buildBody("user", user),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  removeToken: (token) => {
    return fetch(`${ENDPOINT}remove_token`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token || undefined}`
      }
    }).then((resp) => {
      return {"done": true}
    })
  },

  getToken: () => {
    return fetch(AUTH_ENDPOINT, {
      method: 'POST',
      body: getRegisterFormData(),
      headers: {
        'Accept': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  sendRecoveryEmail: (email, token) => {
    return fetch(`${ENDPOINT}/send_recovery_email`, {
      method: 'POST',
      body: getPasswordFormData(email),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Accept': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  }

}
