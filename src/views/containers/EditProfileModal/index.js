import { connect }          from 'react-redux'
import Component            from 'views/components/EditProfileModal'
import { updateUser }       from 'core/user'
import { reduxForm }        from 'redux-form'
import { validate }         from './validations'

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.user,
    user: state.user
  }
}

const FormComponent = reduxForm({
  form: 'edit_profile',
  enableReinitialize: true,
  validate: validate
})(Component)

export default connect(
  mapStateToProps,
  {
    updateUser
  }
)(FormComponent)
