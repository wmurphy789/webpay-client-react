import React, { Component } from 'react'
import PayAccountNew        from 'views/containers/PayAccountNew'
import moment               from 'moment';

var inflection = require( 'inflection' );

class PayAccounts extends Component {

  componentWillMount() {
    this.props.getPaymentAccounts()
  }

  render() {
    const { pay_accounts, deletePayAccount, setDefaultAccount, user } = this.props

    return (
      <div className="card">
        <div className="row row-1">
          <div className="col-md-6">
            <div className="float-left p-3">
              <span>{`Loan #${user.account_number} - ${user.name}`}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="float-right p-3">
              <span>{moment().format('MM/DD/YY')}</span>
            </div>
          </div>
        </div>
        <div className="card-block border-top">
          <div className="row">
            <div className="col-md-12">

              <table className="table table-row-bordered">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nickname</th>
                      <th>Account Number</th>
                      <th>Account Type</th>
                      <th colSpan="2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pay_accounts.map(pay_account => {
                      return (
                        <tr key={pay_account.id}>
                          <td>
                            { pay_account.default && <div className="default-circle large-circle"></div> }
                            { pay_account.recurring_payment && <div className="account-circle large-circle"></div> }
                          </td>
                          <td>{ pay_account.nickname }</td>
                          <td>{ pay_account.hidden_account_number }</td>
                          <td>{ inflection.humanize(pay_account.account_type) }</td>
                          <td>
                            { !pay_account.default &&
                              <span>
                                <button
                                  onClick={() => setDefaultAccount(pay_account.id)}
                                  className="btn btn-sm btn-outline-primary">
                                    Set to default
                                </button>
                              </span>
                            }
                            {' '}
                            <span>
                              <button
                                onClick={() => deletePayAccount(pay_account.id)}
                                className="btn btn-sm delete-button"
                                data-confirm="Are you sure?">
                                  <i className='fa fa-trash' aria-hidden='true'></i> Delete
                              </button>
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                 </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="mx-auto text-center mb-2" style={{"display": "block", "width": "200px"}}>
              <PayAccountNew buttonLabel="Add a New Account"/>
            </div>
          </div>
        </div>

        <div className="row-footer col-md-12 py-2">
          <div>
            <small>
              <div className="account-circle small-circle"></div> Account is used to make recurring payments and cannot be deleted
              <div className="default-circle small-circle ml-3"></div> Account is set as default
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default PayAccounts
