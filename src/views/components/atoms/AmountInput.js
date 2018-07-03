import React                      from 'react'
import { Field }                  from 'redux-form'

const AmountInput = ({ input, type, disabled, validate, required, placeholder, className, meta: { touched, error, warning } }) => {
  const amount = (value) => {
    var n = String(value).replace(/[^\d]/g, '') / 100;
    return n.toFixed(2)
  }

  const parseAmount = (value) => {
    return parseInt(value * 100, 10)
  }

  return (
    <div>
      <div className="input-group">
        <span className="input-group-addon">$</span>
        <Field
          className={`form-control ${touched && error ? 'is-invalid' : ''} ${className}`}
          disabled={disabled}
          name={input.name}
          component="input"
          type="number"
          format={amount}
          parse={parseAmount}
          validate={validate} />
      </div>
      <div>
      {touched &&
        ((error && <span className="danger-text">{error}</span>) ||
          (warning && <span className="warning-text">{warning}</span>))}
      </div>
    </div>
  )
}

export default AmountInput
