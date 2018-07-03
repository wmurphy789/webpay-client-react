import { connect }                from 'react-redux'
import Component                  from 'views/components/RecurringPaymentNew'
import { createRecurringPayment } from 'core/recurring_payment'
import { reduxForm }              from 'redux-form'
import { getPaymentAccounts }     from 'core/pay_account'
import { getAccount }             from 'core/account'
import { validate }               from './validations'
import { getDates }               from 'core/date'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    payment_accounts: state.pay_account,
    account: state.account,
    dates: state.date
  }
}

const FormComponent = reduxForm({
  form: 'new_recurring_payment',
  validate: validate
})(Component)

export default connect(
  mapStateToProps,
  {
    createRecurringPayment,
    getPaymentAccounts,
    getAccount,
    getDates
  }
)(FormComponent)
