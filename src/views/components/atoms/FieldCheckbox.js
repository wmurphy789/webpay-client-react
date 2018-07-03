import React                        from 'react'
import {  FormGroup, Label, Input } from 'reactstrap'

const FieldCheckbox = ({ input, type, label, required, className, meta: { touched, visited, error, warning } }) => {
  return (
    <FormGroup check className="ml-3">
      <Label className="checkbox-inline">
        <Input
          {...input}
          value={`${input.value}`}
          id={input.name}
          type={type}
          className={`form-control ${touched && error ? 'is-invalid' : ''} ${className}`} />{' '}
        {label}
        {
          ((error && <span className="danger-text ml-2">{error}</span>) ||
            (warning && <span className="warning-text ml-2">{warning}</span>))}
      </Label>
    </FormGroup>
  )
}

export default FieldCheckbox
