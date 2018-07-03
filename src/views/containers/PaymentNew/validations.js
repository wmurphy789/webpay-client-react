import validator from 'email-validator'

export const validate = (values) => {
  const errors = {}

  if (values.email) {
    if (!validator.validate(values.email)) {
      errors.email = 'Must be a valid email'
    }
  }

  if(!values.pay_account_id) {
    errors.pay_account_id = 'Required'
  }

  if(values.payment_amount < 0 && values.payment_amount !== "other") {
    errors.payment_amount = 'Required'
  }

  if(values.payment_amount === "other") {
    if(!values.other_payment_amount) {
      errors.other_payment_amount = 'Required'
    }
  }

  if(!values.client_post_date) {
    errors.client_post_date = 'Required'
  }

  return errors
}
