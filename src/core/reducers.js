import { combineReducers }                             from 'redux'
import { documentReducer }                             from './document'
import { accountReducer, currentPaymentReducer }       from './account'
import { notificationReducer }                         from './notification'
import { payAccountReducer, currentPayAccountReducer } from './pay_account'
import { paymentReducer }                              from './payment'
import { profileReducer }                              from './profile'
import { recurringPaymentReducer }                     from './recurring_payment'
import { userReducer }                                 from './user'
import { dateReducer }                                 from './date'
import { messageReducer }                              from './message'
import { reducer as formReducer }                      from 'redux-form'
import { reducer as toastrReducer }                    from 'react-redux-toastr'
function lastAction(state = null, action) {
  return action
}

export default combineReducers({
  current_pay_account: currentPayAccountReducer,
  current_payment: currentPaymentReducer,
  document: documentReducer,
  account: accountReducer,
  notification: notificationReducer,
  pay_account: payAccountReducer,
  payment: paymentReducer,
  profile: profileReducer,
  recurring_payment: recurringPaymentReducer,
  user: userReducer,
  date: dateReducer,
  form: formReducer,
  toastr: toastrReducer,
  message: messageReducer,
  lastAction
})
