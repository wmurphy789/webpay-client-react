import { connect }            from 'react-redux'
import Component              from 'views/components/ForgotPassword'
import { sendRecoveryEmail }  from 'core/user'
import { reduxForm }          from 'redux-form'
import { validate }           from './validations'

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.user.loading || false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendRecoveryEmail: (email) => dispatch(sendRecoveryEmail(email))
  }
}

const FormComponent = reduxForm({
  form: 'forgot_password',
  validate: validate
})(Component)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)
