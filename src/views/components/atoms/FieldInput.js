import React                        from 'react'
import { FormGroup, Label, Input }  from 'reactstrap'

const FieldInput = ({ input, type, label, required, placeholder, children, className, meta: { touched, visited, error, warning } }) => {

  return (
    <FormGroup>
      <Label for={input.name}>
        {required && <abbr title="required">*</abbr> }
        {label}
      </Label>
      <Input
        {...input}
        id={input.name}
        type={type}
        placeholder={placeholder}
        className={`form-control ${touched && error ? 'is-invalid' : ''} ${className}`}>
          {children}
      </Input>
      {touched &&
        ((error && <span className="danger-text">{error}</span>) ||
          (warning && <span className="warning-text">{warning}</span>))}
    </FormGroup>
  )
}

export default FieldInput
