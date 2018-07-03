export const validate = (values) => {

  const errors = {}

  if(values.payment_not_received.email || values.payment_not_received.sms || values.payment_not_received.push) {
    if(!values.day_of_month) {
      errors.day_of_month = 'Required'
    }
  }

  if(values.irs_documents.email) {
    if(!values.irs_documents.electronic) {
      errors.irs_documents = {electronic: 'Required'}
    }
  }

  if(values.billing_statements.email) {
    if(!values.billing_statements.electronic) {
      errors.billing_statements = {electronic: 'Required'}
    }
  }

  return errors
}
