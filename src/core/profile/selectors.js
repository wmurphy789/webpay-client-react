import { createSelector } from 'reselect'
import { findIndex }      from 'lodash'

const getProfile = (state) => {
  return state.profile
}

let setField = (alerts, type) => {
  let index = findIndex(alerts, { 'alert_type': type })
  let data = {}

  if(index > -1) {
    data = alerts[index]
  }

  return data
}

export const getProfileForm = () => createSelector(
  [getProfile],
  (profile) => {
    const { data } = profile

    return {
      payment_not_received: setField(data.alerts, 'payment_not_received'),
      payment_posted: setField(data.alerts, 'payment_posted'),
      recurring_posted: setField(data.alerts, 'recurring_posted'),
      irs_documents: setField(data.alerts, 'irs_documents'),
      billing_statements: setField(data.alerts, 'billing_statements'),
      day_of_month: data.day_of_month
    }
  }
)
