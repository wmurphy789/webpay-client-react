import { connect }                      from 'react-redux'
import Component                        from 'views/components/PaymentNew'
import {getPaymentForm}                 from 'core/payment'
import { getCurrentPayment }            from 'core/account'
import { getPaymentAccounts,
          changeCurrentPayAccount }     from 'core/pay_account'
import { reduxForm, formValueSelector } from 'redux-form'
import { validate }                     from './validations'
import { getDates }                     from 'core/date'

const mapStateToProps = (state, ownProps) => {
  const getForm = getPaymentForm()
  const selector = formValueSelector('payment')
  const lines = selector(state, 'lines')

  return {
    current_payment: state.current_payment,
    account: state.account,
    pay_accounts: state.pay_account.data,
    pay_accounts_loading: state.pay_account.loading,
    current_pay_account: state.current_pay_account,
    user: state.user,
    dates: state.date,
    total_amount_due: (lines || []).reduce((cnt, line) => cnt + Number(line.amount), 0),
    payment: state.payment,
    initialValues: getForm(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	getCurrentPayment: () => dispatch(getCurrentPayment()),
  	getPaymentAccounts: () => dispatch(getPaymentAccounts()),
    getDates: (query) => dispatch(getDates(query)),
    changeCurrentPayAccount: (pay_account) => dispatch(changeCurrentPayAccount(pay_account))
  }
}

const FormComponent = reduxForm({
  form: 'payment',
  enableReinitialize: true,
  validate: validate
})(Component)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)
