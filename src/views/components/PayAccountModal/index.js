import React                                      from 'react'
import { Button, Modal, ModalHeader, ModalBody }  from 'reactstrap'
import CardModal                                  from 'views/containers/CardForm'
import BankAccountModal                           from 'views/containers/BankAccountForm'

class PayAccountModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  cardButton = () => (
    <div>
      <i className="fa fa-credit-card fa-lg"></i> <br/> Debit Card
    </div>
  )

  bankAccountButton = () => (
    <div>
      <i className="fa fa-university fa-lg"></i> <br/> Bank Account
    </div>
  )

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle} className="reverse-button">{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Select Account Type</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <div className="mx-auto py-5 text-center">
                  <div className="row">
                    <CardModal title="Add Debit Card" buttonText={this.cardButton()} formComponent="" parentToggle={this.toggle} />
                    <BankAccountModal title="Add Bank Account" buttonText={this.bankAccountButton()} parentToggle={this.toggle} />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default PayAccountModal
