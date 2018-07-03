export const validate = (values) => {
  const errors = {}

  if(!values.subject) {
    errors.subject = 'Required'
  }

  return errors
}
