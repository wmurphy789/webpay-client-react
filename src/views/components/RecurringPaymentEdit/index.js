import React, { Component }     from 'react'
import Loader                   from 'views/components/atoms/Loader'
import { Field }                from 'redux-form'
import SingleDatePickerWrapper  from 'views/components/atoms/SingleDatePickerWrapper'
import { Link }                 from 'react-router-dom'
import Amount                   from 'views/components/atoms/Amount'
import moment                   from 'moment'

class RecurrringPaymentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month_span: 6
    };
  }

  componentWillMount() {
    this.props.getRecurringPayments()
    this.props.getPaymentAccounts()
    this.props.getAccount()
    let query = {"end_date": moment().add(this.state.month_span, 'M').format()}
    this.props.getDates(query)
  }

  updateRecurringPayment = (values) => {
    this.props.updateRecurringPayment(values);
  }

  render() {
    const {
      handleSubmit,
      payment_accounts,
      account,
      user,
      dates,
      recurring_payment } = this.props

    if (payment_accounts.loading || account.loading || recurring_payment.loading || dates.loading || dates.data.length < 1) {
      return ( <Loader /> )
    } else {
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
            <div className="row mt-2">
          	  <div className="col-md-5 border-right">
            		<table className="table table-row-bordered">
                  <tbody>
              			<tr>
                      <td><label>Current Payment</label></td>
                      <td><Amount size={24} amount={account.payment_amount}/></td>
                    </tr>
              			<tr>
                      <td><label>Loan Number</label></td>
                      <td>{user.account_number}</td>
                    </tr>
                    <tr>
                      <td><label>Frequency</label></td>
                      <td>{recurring_payment.frequency}</td>
                    </tr>
                    {account.convenience_fee &&
                      <tr>
                        <td><label>Convenience Fee</label></td>
                        <td><Amount size={24} amount={account.curtailment}/></td>
                      </tr>
                    }
              			<tr>
                      <td><label>Estimated Amount</label></td>
                      <td><Amount size={24} amount={account.payment_amount}/></td>
                    </tr>
                  </tbody>
            		</table>
          	  </div>

              <div className="col-md-7">
                <form onSubmit={ handleSubmit(this.updateRecurringPayment) }>
                  <input className="payment" value={account.payment_amount} type="hidden" name="payment_amount" />

                  <div className="row ml-2 mr-2">
                    <label htmlFor="pay_account_id">
                      Pay Account
                      <small>
                        <Link to='/pay_accounts' className="simple_link">Add Pay Account</Link>
                      </small>
                    </label>
                    <Field name="pay_account_id" component="select" className="form-control">
                      <option>Add Pay Account</option>
                      {payment_accounts.data.map(pa =>
                        <option value={pa.id} key={pa.id}>
                          {pa.nickname ? `${pa.nickname} - ${pa.hidden_account_number}` : `${pa.hidden_account_number}`}
                        </option>
                      )}
                    </Field>

                    <div className="mt-2 col-md-6 pl-0">
                      <Field
                        name='start_date'
                        component={SingleDatePickerWrapper}
                        className='form-control'
                        placeholder='Start Date'
                        label="Start Date"
                        month_span={this.state.month_span}
                        disabled_days={dates.data.disabled_dates}
                      />
                    </div>

                    <label htmlFor="curtailment" className='mt-2'>Apply Towards Principal<small>(to be added to your regular monthly payment.)</small></label>
                    <div className="input-group">
                      <span className="input-group-addon">$</span>
                      <Field
                        name='curtailment'
                        component='input'
                        type='text'
                        className='form-control'
                        placeholder='0.00' />
                    </div>

                  </div>

                  <button className='btn button btn-block mt-4 mx-auto col-md-5 mb-2'>
                    Update Recurring Payment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default RecurrringPaymentEdit
