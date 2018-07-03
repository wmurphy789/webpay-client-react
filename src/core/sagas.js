import { all } from 'redux-saga/effects'

import { documentSagas }         from './document'
import { accountSagas }          from './account'
import { paymentSagas }          from './payment'
import { profileSagas }          from './profile'
import { recurringPaymentSagas } from './recurring_payment'
import { userSagas }             from './user'
import { payAccountSagas }       from './pay_account'
import { dateSagas }             from './date'
import { notificationSagas }     from './notification'
import { messageSagas }          from './message'

export default function* sagas() {
  yield all([
    ...documentSagas,
    ...accountSagas,
    ...paymentSagas,
    ...profileSagas,
    ...recurringPaymentSagas,
    ...userSagas,
    ...payAccountSagas,
    ...dateSagas,
    ...notificationSagas,
    ...messageSagas
  ]);
}
