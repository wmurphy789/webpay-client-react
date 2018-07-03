import React, { Component } from 'react';
import { Link }             from 'react-router-dom'
import { Field }            from 'redux-form'
import FieldInput           from 'views/components/atoms/FieldInput'
import logo                 from 'views/assets/logo.png'

export default class RegisterScreen extends Component {

  onRegister = (values) => {
    this.props.onRegister(values)
  }

  render() {
    let form;
    const { handleSubmit } = this.props

    form = (
      <form onSubmit={ handleSubmit(this.onRegister) }>
        <div className="row">
          <div className='col-md-6'>
            <Field
              name='email'
              component={FieldInput}
              type='text'
              className='form-control mt-2'
              placeholder='Email' />

            <Field
              name='username'
              component={FieldInput}
              type='text'
              className='form-control mt-2'
              placeholder='Username' />

            <Field
              name='password'
              component={FieldInput}
              type='password'
              className='form-control mt-2'
              placeholder='Password' />

            <Field
              name='password_confirmation'
              component={FieldInput}
              type='password'
              className='form-control mt-2'
              placeholder='Confirmation Password' />
          </div>
          <div className='col-md-6'>
            <Field
              name='name'
              component={FieldInput}
              type='text'
              className='form-control mt-2'
              placeholder='First and Last Name' />

            <Field
              name='zip'
              component={FieldInput}
              type='text'
              className='form-control mt-2'
              placeholder='Property Zip Code' />

            <Field
              name='loan_number'
              component={FieldInput}
              type='text'
              className='form-control mt-2'
              placeholder='Loan Number' />

            <Field
              name='ssn'
              component={FieldInput}
              type='text'
              className='form-control mt-2'
              placeholder='Last 4 of SSN' />
          </div>
        </div>

        <button className='btn button btn-block mt-4 mx-auto col-md-5'>
          Register
        </button>
      </form>
    )

    return (
        <div>
          <div className='row mt-5'>
            <div className='col-md-4 mx-auto'>
              <div className='mx-auto text-center'>
                <div className='company_name'>
                  <img src={logo} alt="logo" />
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-md-8 mx-auto'>
              { form }
              <div className="row mt-5">
                <div className="col-md-12 text-center">
                  <Link to='/login' className="simple_link">Already Registered?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
