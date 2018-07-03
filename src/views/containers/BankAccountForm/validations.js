const abaChecksum = (aba) => {
  if (aba.match(/^\d{9}$/) !== null) {
    let n = 0,
        i = 0;
    for (i = 0; i < aba.length; i += 3) {
      n += parseInt(aba.charAt(i),     10) * 3
        +  parseInt(aba.charAt(i + 1), 10) * 7
        +  parseInt(aba.charAt(i + 2), 10);
    }
    return (n !== 0 && n % 10 === 0) ? true : false;
  } else {
    return false;
  }
}

export const validate = (values) => {
  const errors = {}

  // Name
  if(values.name) {
    let name = values.name.split(" ")
    if(name.length < 2) {
      errors.name = "Last name is required"
    }
  } else if (!values.name) {
    errors.name = 'Required'
  }

  // Routing Number
  if (!values.routing_number) {
    errors.routing_number = 'Required'
  } else if (!abaChecksum(values.routing_number)) {
    errors.routing_number = 'Invalid Routing Number. If the value is correct your bank may not accept ACH.'
  }

  // Account Number
  if (!values.account_number) {
    errors.account_number = 'Required'
  } else if (values.account_number && values.account_number.length < 4) {
    errors.account_number = 'Must be between 4 characters or more'
  } else if (values.account_number && values.account_number.length > 17) {
    errors.account_number = 'Must be 17 characters or less'
  } else if (values.account_number && /[^0-9 ]/i.test(values.account_number)) {
    errors.account_number = 'Only numbers allowed'
  }

  return errors
}
