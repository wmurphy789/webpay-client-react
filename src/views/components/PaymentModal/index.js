import React                          from 'react'
import { Button, Modal, ModalHeader,
         ModalBody }                  from 'reactstrap'
import Amount                         from 'views/components/atoms/Amount'

class PaymentModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      toggle: this.props.toggle || false,
      current_payment: this.props.current_payment
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      toggle: nextProps.toggle,
      current_payment: nextProps.current_payment
    })
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  onSave = () => {
    this.toggle()
    this.props.createPayment(this.state.current_payment)
  }

  getCurrentPayAccount() {
    const { pay_accounts } = this.props
    const {current_payment} = this.state

    var pay_info = ""

    for(var i in pay_accounts) {
      let pay_account = pay_accounts[i]
      if(pay_account["id"] == current_payment.pay_account_id) {
        pay_info = `${pay_account.nickname} - ${pay_account.hidden_account_number}`
      }
    }

    return pay_info
  }

  render() {
    const { current_payment } = this.state

    if(!current_payment) {
      return (
        <div>
          <Button className="btn-block button">{this.props.buttonLabel}</Button>
        </div>
      )
    }

    return (
      <div>
        <Button className="btn-block button">{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.toggle} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Verify the information below is correct</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <div className="mx-auto">
                  <table className="table table-row-bordered">
                    <tbody>
                      <tr>
                        <td>Loan Number</td>
                        <td>{current_payment.loan_number}</td>
                      </tr>
                      <tr>
                        <td>Payment Date</td>
                        <td>{current_payment.client_post_date}</td>
                      </tr>
                      <tr>
                        <td>Payment Account</td>
                        <td>{`${this.getCurrentPayAccount()}`}</td>
                      </tr>
                      <tr>
                        <td>Amount to Debit</td>
                        <td><Amount amount={Number(current_payment.total_amount_due)} size={18} /></td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={this.onSave} className='btn button btn-block mt-4'>
                    Authorize Payment
                  </button>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default PaymentModal
