export const luhn = (value) => {
  let len = value.length,
      arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9],
      bit = 1,
      sum = 0,
      val;

  while (len) {
    val = parseInt(value.charAt(--len), 10);
    sum += (bit ^= 1) ? arr[val] : val;
  }

  return sum && sum % 10 === 0 ;
}

export const validate = (values) => {
  const errors = {}
  
  if(values.name) {
    let name = values.name.split(" ")
    if(name.length < 2) {
      errors.name = "Last name is required"
    }
  } else if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.number) {
    errors.number = 'Required'
  } else if (!luhn(values.number)) {
    errors.number = 'Invalid number'
  }

  if (values.cvc && values.cvc.length > 4) {
    errors.cvc = 'Must be 4 characters or less'
  }

  if (!values.exp_month) {
    errors.exp_month = 'Required'
  }

  if (!values.exp_year) {
    errors.exp_year = 'Required'
  }

  if (!values.address_line1) {
    errors.address_line1 = 'Required'
  }

  if (!values.address_city) {
    errors.address_city = 'Required'
  }

  if (!values.address_state) {
    errors.address_state = 'Required'
  }

  if (!values.address_zip) {
    errors.address_zip = 'Required'
  }

  return errors
}
