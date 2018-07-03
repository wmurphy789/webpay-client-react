import React, { Component } from 'react';
import { Link }             from 'react-router-dom'
import { Field }            from 'redux-form'
import Loader               from 'views/components/atoms/Loader'
import FieldInput           from 'views/components/atoms/FieldInput'
import logo                 from 'views/assets/logo.png'

export default class ForgotPasswordScreen extends Component {

  onResetPassword = (email) => {
    this.props.sendRecoveryEmail(email)
  }

  render() {
    let form;
    const { handleSubmit } = this.props

    if (this.props.loading)
      form = ( <Loader /> )
    else
      form = (
        <form onSubmit={ handleSubmit(this.onResetPassword) }>
          <Field
            name='email'
            component={FieldInput}
            type='text'
            className='form-control'
            placeholder='Email' />

          <button className='btn button btn-block mt-4'>
            Send Email
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
            <div className='col-md-4 mx-auto'>
              { form }

              <div className="row mt-5">
                <div className="col-md-12 text-center">
                  <Link to='/login' className="simple_link">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
