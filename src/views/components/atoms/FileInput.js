import React                        from 'react'
import { FormGroup, Label, Input }  from 'reactstrap'

const FileInput = ({ input, type, label, required, placeholder, children, className, meta: { touched, visited, error, warning } }) => {

  return (
    <FormGroup>
      <Label for={input.name}>
        {required && <abbr title="required">*</abbr> }
        {label}
      </Label>
      <input
        type="file"
        name={input.name}
        onChange={
          ( e ) => {
            e.preventDefault();
            input.onChange(e.target.files);
          }
        }
      />

      {touched &&
        ((error && <span className="danger-text">{error}</span>) ||
          (warning && <span className="warning-text">{warning}</span>))}
    </FormGroup>
  )
}

export default FileInput
