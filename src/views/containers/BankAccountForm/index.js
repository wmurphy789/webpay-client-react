import { connect }            from 'react-redux'
import { reduxForm }          from 'redux-form'
import Component              from 'views/components/BankAccountModal'
import { createBankAccount }  from 'core/pay_account'
import { validate }           from './validations'

const mapStateToProps = (state, ownProps) => {
  return { }
}

const FormComponent = reduxForm({
  form: 'bank_account',
  validate: validate,
  initialValues: {
    account_type: 'checking',
    default: false
  }
})(Component)

export default connect(
  mapStateToProps,
  {
    createBankAccount
  }
)(FormComponent)
