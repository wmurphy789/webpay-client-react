export const validate = (values, props) => {
  const { account } = props
  const errors = {}

  if(values.other_payment_amount < account.min_due) {
    errors.other_payment_amount = "Must be more than the minimum payment"
  }

  if(values.start_date && values.end_date) {
    if(values.start_date > values.end_date) {
      errors.end_date = "End date can't be less than start date"
    }
  }

  return errors
}
