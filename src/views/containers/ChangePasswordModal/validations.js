export const validate = (values) => {

  const errors = {}

  if(!values.current_password) {
    errors.current_password = 'Required'
  }

  if(!values.password) {
    errors.password = 'Required'
  }

  if(!values.password_confirmation) {
    errors.password_confirmation = 'Required'
  } else if(values.password_confirmation !== values.password) {
    errors.password_confirmation = 'Doesn\'t match password'
  }

  return errors
}
