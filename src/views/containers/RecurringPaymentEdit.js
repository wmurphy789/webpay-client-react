import { connect }                from 'react-redux'
import Component                  from 'views/components/RecurringPaymentEdit'
import { updateRecurringPayment,
         getRecurringPayments }   from 'core/recurring_payment'
import { reduxForm }              from 'redux-form'
import { getPaymentAccounts }     from 'core/pay_account'
import { getAccount }             from 'core/account'
import { getDates }               from 'core/date'

const mapStateToProps = (state, ownProps) => {
  const recurring_payment = state.recurring_payment.data.length > 0 ? state.recurring_payment.data[0] : []

  return {
    user: state.user,
    payment_accounts: state.pay_account,
    account: state.account,
    recurring_payment: state.recurring_payment,
    dates: state.date,
    initialValues: recurring_payment
  }
}

const FormComponent = reduxForm({
  form: 'edit_recurring_payment',
  enableReinitialize: true
})(Component)

export default connect(
  mapStateToProps,
  {
    updateRecurringPayment,
    getPaymentAccounts,
    getAccount,
    getRecurringPayments,
    getDates
  }
)(FormComponent)
