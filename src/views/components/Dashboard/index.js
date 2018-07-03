import React, {Component}   from 'react';
import CircularProgressbar  from 'react-circular-progressbar';
import { Link }             from 'react-router-dom'
import moment               from 'moment';
import Amount               from 'views/components/atoms/Amount'
import Zestimate            from 'views/components/Zestimate'
import styles               from 'views/components/atoms/Styles';
import Loader               from 'views/components/atoms/Loader'
import toolTipStyle         from 'views/components/atoms/tooltipStyle'
import { Tooltip }          from 'react-lightweight-tooltip'

export default class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pay_amount_percent: 0,
      pay_month_percent: 0,
    }
  }

  componentWillMount() {
    this.props.getAccount()
  }

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps
    this.setState({
      pay_amount_percent: Math.round((account.principal / account.original_amount) * 100) || 0,
      pay_month_percent: Math.round((account.terms_paid / account.original_term) * 100) || 0
    });
  }

  render() {
    const { account, user } = this.props

    if (account.loading || account.total_amount_due === undefined)
      return (<Loader />)

    return (
      <div className="card home">
        <div className="row">
          <div className="col-md-6">
            <div className="float-left p-3">
              <span>{`Loan #${user.account_number} - ${user.name}`}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="float-right p-3">
              {moment().format('MM/DD/YY')}
            </div>
          </div>
        </div>

        <div className="card-block border-top">

          <div className="row no-gutters border-bottom">
            <div className="col-md-6 border-right">
              <div className="pl-3 pt-5 pb-5">
                <small>Amount Due</small><br/>
                <h2>
                  <Amount style={{container:styles.centered}} amount={account.total_amount_due} size={56} /> <Link to='/payments/new' className="btn reverse-button align-top mt-3 ml-4">Make a Payment</Link>
                </h2>
              </div>
            </div>

            <div className="col-md-6">
            <div className="row no-gutters">
              <div className="col-md-6 border-right pl-3">

                <div className="row">
                  <div className="col-md-5 p-3">
                    <CircularProgressbar percentage={this.state.pay_amount_percent} className="progressbar-green" />
                  </div>
                  <div className="col-md-7 p-3">
                      <span>
                        <Amount style={{container:styles.centered}} amount={account.principal} size={styles.container_progress_amount.fontSize} />
                      </span>
                      <br/>

                      <small>Principal Paid to Date</small>
                      <br/>
                      <span>
                        <Amount style={{container:styles.centered}} amount={account.original_amount} size={styles.container_progress_amount.fontSize} />
                      </span>
                      <br/>
                      <small>Original Loan Amount</small>
                  </div>
                </div>


              </div>
              <div className="col-md-6 pl-3">

                <div className="row">
                  <div className="col-md-5 p-3">
                      <CircularProgressbar percentage={this.state.pay_month_percent} className="progressbar-orange" />
                  </div>
                  <div className="col-md-7 p-3">
                    <span className="size-18">
                      {account.original_term / 12} Years
                    </span><br/>
                    <small>Original Loan Term</small><br/>

                    <span className="size-18">
                      {account.terms_paid} of {account.original_term} Payments
                    </span><br/>
                    <small>Payments Paid To Date</small>
                  </div>
                </div>


              </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2 border-right custom-padding">
              <small className="ml-2">Interest Rate</small><br/>
              <span className="ml-2 size-18">
                {account.interest_rate}%
              </span>
            </div>
            <div className="col-md-2 border-right">
              <small>Current Balance</small><br/>
              <span>
                <Amount style={{container:styles.separate_top}} amount={account.current_balance} size={styles.container_details_value.fontSize} />
                <Tooltip content="This is for information purposes only and isn't a payoff quote or an attempt to collect a debt." styles={toolTipStyle}>
                  <i className="fa fa-info-circle mr-1" aria-hidden="true"></i>
                </Tooltip>
              </span>
            </div>
            <div className="col-md-2 border-right">
              <small>Escrow Balance</small><br/>
              <span>
                <Amount style={{container:styles.separate_top}} amount={account.escrow} size={styles.container_details_value.fontSize} />
              </span>
            </div>
            <div className="col-md-2 border-right">
              <small>Last Payment</small><br/>
              <span className="size-18">
                {moment(account.last_payment_at).format('MM/DD/YY')}
              </span>
            </div>
            <div className="col-md-4">
              <Zestimate loan={account} />
            </div>
          </div>

        </div>


      </div>
    );
  }
}
