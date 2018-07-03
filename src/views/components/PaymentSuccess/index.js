import React, { Component } from 'react'
import Loader               from 'views/components/atoms/Loader'
import Amount               from 'views/components/atoms/Amount'
import { Link }             from 'react-router-dom'

class PaymentSuccess extends Component {

  printScreen = () => {
    window.print();
  }

  render() {
    const { payment } = this.props

    if (!payment) {
      return ( <Loader /> )
    }

    return (
      <div className="card mt-3">
        <div className="card-block border-top">
          <div className="row text-center">
            <p className="mx-auto mt-4">Thank You. The information detailed below has successfully submitted for processing</p>
          </div>

          <div className="row mx-auto">
            <div className="col-md-12">
              <ul>
                <li className="list-group-item">
                  <label>Loan Number: <p className="d-inline">{payment.loan_number}</p></label>
                </li>
                <li className="list-group-item">
                  <label>Posting Date: <p className="d-inline">{payment.transaction_date}</p></label>
                </li>
                <li className="list-group-item">
                  <label>Amount to Debit: <p className="d-inline"><Amount amount={payment.total_payment} size={18}/></p></label>
                </li>
                <li className="list-group-item">
                  <label>Tracking Number: <p className="d-inline">{payment.tracking}</p></label>
                </li>
              </ul>
            </div>
          </div>

          <div className="row mb-2 mt-3">
            <div className="mx-auto">
            <Link to='/' className="btn button">Done</Link>
            <button onClick={this.printScreen} className='btn btn-secondary ml-5'>
              Print
            </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PaymentSuccess
