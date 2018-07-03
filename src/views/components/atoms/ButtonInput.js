import React                        from 'react'
import { InputGroup, Label, Input }  from 'reactstrap'
import { FilePicker } from 'react-file-picker'

const ButtonInput = ({ input, type, label, required, placeholder, children, className, onFileChange, meta: { touched, visited, error, warning } }) => {

  return (
    <InputGroup>
      <Input
        {...input}
        id={input.name}
        type={type}
        placeholder={placeholder}
        className={`form-control ${touched && error ? 'is-invalid' : ''} ${className}`}>
          {children}
      </Input>
      <span className="input-group-addon input-group-addon-btn bg-white">
        <FilePicker
          onChange={onFileChange}
          onError={errMsg => console.log("")}
          >
          <button className="btn px-2"><i className="fa fa-paperclip" aria-hidden="true"></i></button>
        </FilePicker>
      </span>
      <span className="input-group-addon input-group-addon-btn bg-white" style={{borderRight:"1px solid #ced4da"}}>
          <button className="btn px-2"><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
      </span>
      <Input
        id="image"
        name="image"
        type="hidden">
      </Input>
      {touched &&
        ((error && <span className="danger-text">{error}</span>) ||
          (warning && <span className="warning-text">{warning}</span>))}
    </InputGroup>
  )
}

export default ButtonInput
