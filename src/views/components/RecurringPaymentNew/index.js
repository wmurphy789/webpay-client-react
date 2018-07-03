import React, { Component }     from 'react'
import Loader                   from 'views/components/atoms/Loader'
import { Field }                from 'redux-form'
import SingleDatePickerWrapper  from 'views/components/atoms/SingleDatePickerWrapper'
import { Link }                 from 'react-router-dom'
import Amount                   from 'views/components/atoms/Amount'
import AmountInput              from 'views/components/atoms/AmountInput'
import moment                   from 'moment'

class RecurrringPaymentNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month_span: 6
    };
  }

  componentWillMount() {
    this.props.getAccount()
    this.props.getPaymentAccounts()
    let query = {"end_date": moment().add(this.state.month_span, 'M').format()}
    this.props.getDates(query)
  }

  createRecurringPayment = (values) => {
    this.props.createRecurringPayment(values);
  }

  render() {
    const { handleSubmit, payment_accounts, account, user, dates } = this.props
    let form

    if (payment_accounts.loading || account.loading || dates.loading || dates.data.length < 1)
      return ( <Loader /> )
    else
      form = (
        <form onSubmit={ handleSubmit(this.createRecurringPayment) }>
          <div className="ml-2 mr-2">
            <label htmlFor="payment_amount" className='mt-2'>Payment Amount</label>
            <Field
              type="number"
              component={AmountInput}
              name="payment_amount"
              className="form-control"
              disabled={false} />
          </div>

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

            <label htmlFor="frequency" className='mt-2'>Frequency</label>
            <Field name="frequency" component="select" className="form-control">
              <option></option>
              <option value="monthly">Monthly</option>
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
            Create Recurring Payment
          </button>
        </form>
      )
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
                  {account.convenience_fee ?
                    <tr><td><label>Convenience Fee</label></td><td><Amount size={24} amount={account.curtailment}/></td></tr>
                    : <tr></tr>}
            			<tr>
                    <td><label>Estimated Amount</label></td>
                    <td><Amount size={24} amount={account.payment_amount}/></td>
                  </tr>
                </tbody>
          		</table>
        	  </div>

            <div className="col-md-7">
              { form }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RecurrringPaymentNew
