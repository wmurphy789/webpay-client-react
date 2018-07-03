import React, { Component } from 'react'
import Loader               from 'views/components/atoms/Loader'
import { Button }           from 'reactstrap';
import { Link }             from 'react-router-dom'
import moment               from 'moment'
import Amount               from 'views/components/atoms/Amount'

class RecurrringPayments extends Component {
  componentWillMount() {
    this.props.getRecurringPayments()
  }

  deleteRecurringPayment() {
    const { deleteRecurringPayment, recurring_payment } = this.props
    deleteRecurringPayment(recurring_payment.data[0].id);
  }

  render() {
    const { recurring_payment, user } = this.props

    if(recurring_payment.loading) {
      return ( <Loader /> )
    }

    return (
      <div className="card">
        <div className="row">
          <div className="col-md-6">
            <div className="float-left p-3">
              {`Loan: #${user.account_number} - ${user.name} `}
            </div>
          </div>
          <div className="col-md-6">
            <div className="float-right p-3">
              {moment().format('MM/DD/YY')}
            </div>
          </div>
        </div>
        <div className="card-block border-top">
          <div className="row">
            <div className="col-md-12">
              <table className="table table-row-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Payment Amount</th>
                      <th>Frequency</th>
                      <th>Next Debit Date</th>
                      <th>Account</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="table_rows">
                  {Object.keys(recurring_payment.data).length > 0 ? (
                    <tr>
                      <td><Amount amount={recurring_payment.data[0].payment_amount} size={13}/></td>
                      <td>{recurring_payment.data[0].frequency}</td>
                      <td>{recurring_payment.data[0].next_date}</td>
                      <td>{recurring_payment.data[0].account_number}</td>
                      <td>
                        <Link to='/recurring_payments/edit' className="btn btn-sm btn-outline-primary">
                          <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                        </Link>

                        <Button onClick={()=>this.deleteRecurringPayment()} className="btn btn-sm delete-button ml-2" data-confirm="Are you sure?">
                          <i className='fa fa-trash' aria-hidden='true'></i>  Delete
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="6" align="center">You do not have a recurring payment setup. Click <Link to='/recurring_payments/new' className="simple_link">here</Link> to create a recurring payment.</td>
                    </tr>
                    )
                  }
                 </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecurrringPayments
