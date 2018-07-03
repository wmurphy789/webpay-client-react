import { connect }                  from 'react-redux'
import Component                    from 'views/components/EditProfilePreferences'
import { updateAlertPreferences,
         getProfileForm }           from 'core/profile'
import { reduxForm }                from 'redux-form'
import { validate }                 from './validations'

const mapStateToProps = (state, ownProps) => {
  const getForm = getProfileForm()

  return {
    profile: state.profile.data,
    initialValues: getForm(state),
    error: state.profile.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateAlertPreferences: (profile) => dispatch(updateAlertPreferences(profile))
  }
}

const FormComponent = reduxForm({
  form: 'edit_profile_preferences',
  enableReinitialize: true,
  validate: validate
})(Component)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)
