import React, { Component } from 'react';
import { Link }             from 'react-router-dom'
import logo                 from 'views/assets/logo.png'

export default class ThankYouScreen extends Component {

  render() {

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

              <div className="row mt-5">
                <div className="col-md-12 text-center">
                  <h1>Thank you!</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
