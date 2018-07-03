import React, { Component }     from 'react'
import Loader                   from 'views/components/atoms/Loader'
import moment                   from 'moment';
import Amount                   from 'views/components/atoms/Amount'
import { Field, FieldArray }    from 'redux-form'
import { Link }                 from 'react-router-dom'
import { titleize }             from 'utils/custom_services';
import PaymentModal             from 'views/containers/PaymentModal'
import AmountInput              from 'views/components/atoms/AmountInput'
import { required, minValue,
         email, maxValue }      from 'utils/custom_services'
import SingleDatePickerWrapper  from 'views/components/atoms/SingleDatePickerWrapper'

const renderPaymentLine = (line, index, field) => {
  const { item_name, readonly, maximum, item_description, amount } = field.get(index)
  let max_val = maximum === null ? amount : maximum

  return (
    <div key={index} className="form-group row">
      <label className="col-sm-4 col-form-label">{titleize(item_name)}</label>
      <div className="col-sm-3">
        <Field
          type="number"
          name={`${line}.amount`}
          className="form-control left-border-none form-control-sm payment"
          component={AmountInput}
          disabled={readonly}
          validate={[maxValue(max_val), minValue(0)]}
        />
      </div>
      <div className="col-sm-3">
        <small>{item_description}</small>
      </div>
    </div>
  )
}

const renderLines = ({ fields, meta: { error, submitFailed } }) => {
  return fields.map(renderPaymentLine)
}

class PaymentNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
      month_span: 3
    }
  }

  componentWillMount() {
    const { current_payment, getPaymentAccounts, getCurrentPayment } = this.props

    if (!current_payment.invoice_total) {
      getPaymentAccounts();
      getCurrentPayment();
    }

    let query = {"end_date": moment().add(this.state.month_span, 'M').format()}
    this.props.getDates(query)
  }

  componentWillReceiveProps(nextProps) {
    this.props.change('total_amount_due', parseFloat(nextProps.total_amount_due))
  }

  savePayment = (values) => {
    this.setState({
      toggle: !this.state.toggle,
      current_payment: values
    })
  }

  render() {
    const { handleSubmit, current_payment, pay_accounts, user, dates, payment } = this.props

    if (!current_payment.invoice_total || dates.loading || dates.data.length < 1) {
      return ( <Loader /> )
    } else if (payment.loading) {
      return ( <Loader label="Payment is Processing" /> )
    }

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

        <form onSubmit={ handleSubmit(this.savePayment) } >

          <div className="card-block border-top">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-4 border-right p-2">
                  <div>
                    <label>Payment Amount:</label>
                    <h1 className="payment_amount">
                      <Amount amount={current_payment.lines[0].amount}/>
                    </h1> <small>{current_payment.lines[0].item_description}</small>
                  </div>
                </div>

                <div className="col-md-7 border-right p-2">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <Field
                          name='client_post_date'
                          component={SingleDatePickerWrapper}
                          className='form-control'
                          placeholder='Post Date'
                          label="Payment Date"
                          month_span={this.state.month_span}
                          disabled_days={dates.data.disabled_dates}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Account</label>
                        <small>
                          <Link to='/pay_accounts' className="simple_link ml-2">Add Pay Account</Link>
                        </small>
                        { pay_accounts &&
                          <Field
                            name="pay_account_id"
                            component="select"
                            className="form-control required"
                            validate={[required]}>
                              <option>Please select a Pay Account</option>
                              {pay_accounts.map(pa => <option key={pa.id} value={pa.id}>{`${pa.nickname} - ${pa.hidden_account_number}`}</option>)}
                          </Field>
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-1 text-right reverse-background p-2">
                  <label>Next Due Date</label><br/>
                  <h3>{moment(current_payment.next_payment_due_at).format('MM/DD/YY')}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="card-block border-top">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-8 border-right p-3">

                  {current_payment.status === "delinquent" ?
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">Reason for Delinquency</label>
                      <div className="col-sm-3">
                        <Field name="delinquency_code" component="select" className="form-control">
                          <option>Please choose a reason</option>
                          <option value="001">Death of Borrower</option>
                          <option value="002">Borrower Illness</option>
                          <option value="003">Illness in Family</option>
                          <option value="004">Death in Family</option>
                          <option value="005">Marital Difficulties</option>
                        </Field>
                      </div>
                    </div>
                  : <div></div>}

                  <FieldArray name="lines" component={renderLines} />

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Amount to debit</label>
                    <div className="col-sm-3">
                      <Field
                        type="number"
                        component={AmountInput}
                        name="total_amount_due"
                        className="form-control left-border-none form-control-sm"
                        disabled={true}
                      />
                    </div>
                  </div>

                </div>

                  <div className="col-md-4 p-3">
                    <div className="form-group">
                      <label>Email Confirmation To:</label>
                      <Field
                        component="input"
                        name="email"
                        className="form-control"
                        valiate={[required, email]}
                      />
                    </div>
                    <PaymentModal buttonLabel="Pay Now" toggle={this.state.toggle} current_payment={this.state.current_payment} />
                  </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PaymentNew
