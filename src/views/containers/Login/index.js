import { connect }       from 'react-redux'
import Component         from 'views/components/Login'
import { login }         from 'core/user'
import { reduxForm }     from 'redux-form'
import { validate }      from './validations'

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.user.loading || false,
    user: state.user || null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: (user) => dispatch(login(user))
  }
}

const FormComponent = reduxForm({
  form: 'login',
  validate: validate
})(Component)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)
