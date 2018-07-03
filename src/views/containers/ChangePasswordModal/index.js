import { connect }          from 'react-redux'
import Component            from 'views/components/ChangePasswordModal'
import { updatePassword }   from 'core/user'
import { reduxForm }        from 'redux-form'
import { validate }         from './validations'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePassword: (passwords) => dispatch(updatePassword(passwords))
  }
}

const FormComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default reduxForm({
  form: 'change_password',
  validate: validate
})(FormComponent)
