import React, { Component } from 'react';
import { Link }             from 'react-router-dom'
import { Field }            from 'redux-form'
import FieldInput           from 'views/components/atoms/FieldInput'
import logo                 from 'views/assets/logo.png'
import { getUrlParameter }  from 'utils/custom_services'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CryptoJS = require("crypto-js");
const base64 = require('base-64');

export default class LoginScreen extends Component {
  // REMOVE THIS IF NOT SSO CLIENT
  componentWillMount() {
    this.ssoLogin()
  }

  ssoLogin() {
    var token = getUrlParameter('token').replace(/\s/g, '')

    if(token) {
      var base_64 = CryptoJS.AES.decrypt(token.toString(), CLIENT_ID.toString())
      var decoded = JSON.parse(base_64.toString(CryptoJS.enc.Utf8))

      if(CLIENT_ID === decoded.api_key) {
        this.props.onLogin({
          "loan_number" : decoded.loan_number,
          "ssn" : decoded.ssn,
          "zip" : decoded.zip
        })
      }
    }
  }

  onLogin = (values) => {
    this.props.onLogin(values)
  }

  render() {
    const { handleSubmit } = this.props
    // NOTE: This is for SSO Login
    // let form = (
    //   <form onSubmit={ handleSubmit(this.onLogin) }>
    //     <Field
    //       name="loan_number"
    //       type="text"
    //       placeholder="Loan Number"
    //       component={FieldInput}
    //     />
    //
    //     <Field
    //       name="ssn"
    //       type="text"
    //       placeholder="SSN"
    //       className='form-control mt-2'
    //       component={FieldInput}
    //     />
    //
    //     <Field
    //       name="zip"
    //       type="text"
    //       placeholder="Zip Code"
    //       className='form-control mt-2'
    //       component={FieldInput}
    //     />
    //
    //     <button className='btn button btn-block mt-4'>
    //       Login
    //     </button>
    //   </form>
    // )

    let form = (
      <form onSubmit={ handleSubmit(this.onLogin) }>
        <Field
          name="username"
          type="text"
          placeholder="Email"
          component={FieldInput}
        />

        <Link to='/forgot_password' className="float-right mt-4 simple_link">Forgot Password?</Link>

        <Field
          name="password"
          type="password"
          placeholder="Password"
          className='form-control mt-2'
          component={FieldInput}
        />

        <button className='btn button btn-block mt-4'>
          Login
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
            {process.env.REACT_APP_LOGIN_ALERT &&
              <div class="alert alert-warning">
                <strong>Warning!</strong> {process.env.REACT_APP_LOGIN_ALERT}
              </div>
            }
            { form }
            <div className="row mt-5">
              <div className="col-md-6">
                <Link to='/register' className="simple_link">Register</Link>
              </div>
              <div className="col-md-6 text-right">
                <Link to='/contact_us' className="simple_link">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
