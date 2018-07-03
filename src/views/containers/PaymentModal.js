import { connect }          from 'react-redux'
import Component            from 'views/components/PaymentModal'
import { reduxForm }        from 'redux-form'
import { createPayment }    from 'core/payment'

const mapStateToProps = (state, ownProps) => {
  return {
    pay_accounts: state.pay_account.data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createPayment: (payment) => dispatch(createPayment(payment))
  }
}

const FormComponent = reduxForm({
  form: 'authorize_payment',
  enableReinitialize: true
})(Component)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)
