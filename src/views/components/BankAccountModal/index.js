import React                                      from 'react'
import { Field }                                  from 'redux-form'
import { Button, Modal, ModalHeader, ModalBody,
         ModalFooter, Row, Col }                  from 'reactstrap'
import FieldCheckbox                              from 'views/components/atoms/FieldCheckbox'
import FieldInput                                 from 'views/components/atoms/FieldInput'
import checkImage                                 from './micrsamplesmall_no_number.gif'

class BankAccountModal extends React.Component {
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

  closeModal = () => {
    this.props.parentToggle()
    this.toggle()
  }

  createBankAccount = (values) => {
    this.props.createBankAccount(values)
    this.props.parentToggle()
  }

  render() {
    const { handleSubmit, submitting } = this.props

    return (
      <div className="col-md-6">
        <Button className="btn btn-outline-secondary pay-account-button" onClick={this.toggle}>
          {this.props.buttonText}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader>{this.props.title}</ModalHeader>
          <form onSubmit={handleSubmit(this.createBankAccount)}>
            <ModalBody>
              <Row>
                <Col md="7" className="border-right">

                  <h4>Bank Information</h4>

                  <Row>
                    <Col md="12">
                      <Field
                        name="name"
                        type="text"
                        label="Account Holder's Name"
                        component={FieldInput}
                        required={true} />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <img src={checkImage} className="img-responsive" alt="check_example" />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Field
                        name="routing_number"
                        type="text"
                        label="Routing and Transit Number"
                        placeholder="9 digits"
                        component={FieldInput}
                        required={true} />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Field
                        name="account_number"
                        type="text"
                        label="Account Number"
                        placeholder="Up to 17 digits"
                        component={FieldInput}
                        required={true} />
                    </Col>
                  </Row>
                </Col>

                <Col md="5">
                  <h4>Account Information</h4>

                  <Row>
                    <Col md="12">
                      <div>
                        <label>Account Type</label>
                        <div>
                          <label>
                            <Field
                              name="account_type"
                              component="input"
                              type="radio"
                              value="checking"
                            />{' '}
                            Checking
                          </label>
                          {' '}
                          <label>
                            <Field
                              name="account_type"
                              component="input"
                              type="radio"
                              value="savings"
                            />{' '}
                            Savings
                          </label>
                        </div>
                        <div>
                          <label>
                            <Field
                              name="type"
                              component="input"
                              type="radio"
                              value="personal"
                              checked
                            />{' '}
                            Personal
                          </label>
                          {' '}
                          <label>
                            <Field
                              name="type"
                              component="input"
                              type="radio"
                              value="business"
                            />{' '}
                            Business
                          </label>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Field
                        name="nickname"
                        label="Account Nickname"
                        component={FieldInput} />
                    </Col>

                    <Col md="12">
                      <Field
                        name="default"
                        component={FieldCheckbox}
                        label="Set to Default"
                        type="checkbox" />
                    </Col>
                  </Row>

                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="default" onClick={this.closeModal} disabled={submitting} className="mr-auto reverse-button">Cancel</Button>
              <Button type="submit" className="button" disabled={submitting}>Add Account</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    )
  }
}

export default BankAccountModal
