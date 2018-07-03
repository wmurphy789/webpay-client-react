import React                          from 'react'
import { Field }                      from 'redux-form'
import { Button, Modal, ModalHeader,
  ModalBody, ModalFooter, Row, Col }  from 'reactstrap'
import FieldCheckbox                  from 'views/components/atoms/FieldCheckbox'
import FieldInput                     from 'views/components/atoms/FieldInput'
import { Months, Years, States }      from 'utils/custom_services'

class CardModal extends React.Component {
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

  createCard = (values) => {
    this.props.createCardAccount(values)
    this.props.parentToggle()
  }

  render() {
    const { handleSubmit, submitting } = this.props

    return (
      <div className="col-md-6">
        <Button onClick={this.toggle} className="btn btn-outline-secondary pay-account-button">
          {this.props.buttonText}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader>{this.props.title}</ModalHeader>

          <form onSubmit={handleSubmit(this.createCard)}>
            <ModalBody>
              <Row>
                <Col md="7" className="border-right">

                  <h4>Card Details</h4>

                  <Row>
                    <Col md="12">
                      <Field
                        name="name"
                        type="text"
                        label="Card Holder's Name"
                        component={FieldInput}
                        required={true} />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="9">
                      <Field
                        name="number"
                        label="Card Number"
                        component={FieldInput}
                        required={true} />
                    </Col>
                    <Col md="3">
                      <Field
                        name="cvc"
                        label="Card Code"
                        component={FieldInput} />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Field
                        name="exp_month"
                        label="Exp. Month"
                        type="select"
                        component={FieldInput}
                        required={true} >
                          <option/>
                          {Months().map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
                      </Field>
                    </Col>
                    <Col md="6">
                      <Field
                        name="exp_year"
                        label="Exp. Year"
                        type="select"
                        component={FieldInput}
                        required={true} >
                          <option/>
                          {Years().map(y => <option key={y.key} value={y.key}>{y.label}</option>)}
                      </Field>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12">
                      <Field
                        name="nickname"
                        label="Account Nickname"
                        component={FieldInput} />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="4">
                      <Field
                        name="default"
                        component={FieldCheckbox}
                        label="Set to Default"
                        type="checkbox" />
                    </Col>
                  </Row>
                </Col>

                <Col md="5">
                  <h4>Billing Address</h4>
                  <Row>
                    <div className="col-md-12">
                      <Field
                        name="address_line1"
                        label="Address"
                        component={FieldInput}
                        required={true} />
                    </div>
                    <div className="col-md-12">
                      <Field
                        name="address_line2"
                        label="Address 2"
                        component={FieldInput} />
                    </div>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Field
                        name="address_city"
                        label="Address City"
                        component={FieldInput}
                        required={true} />
                    </Col>

                    <Col md="6">
                      <label>Address State</label>
                      <Field name="address_state" component="select" className="form-control">
                        <option />
                        {States().map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                      </Field>
                    </Col>

                    <Col md="6">
                      <Field
                        name="address_zip"
                        label="Address Zip"
                        component={FieldInput}
                        required={true} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="default" onClick={this.closeModal} disabled={submitting} className="mr-auto reverse-button">Cancel</Button>
              <Button type="submit" disabled={submitting} className="button">Add Account</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    )
  }
}

export default CardModal
