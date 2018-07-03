import React                          from 'react'
import { Button, Modal, ModalHeader,
  ModalBody, Row, Col }               from 'reactstrap'
import { Field }                      from 'redux-form'
import FieldInput                     from 'views/components/atoms/FieldInput'
import { States }                     from 'utils/custom_services'

class EditProfileModal extends React.Component {
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

  onSave = (values) => {
    this.props.updateUser(values, this.props.user.id)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className="d-inline-block">
        <Button onClick={this.toggle} className="btn-danger reverse-button">{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <div className="mx-auto">
                  <form onSubmit={ handleSubmit(this.onSave) }>
                    <label>Username</label>
                    <Field
                      name='username'
                      component='input'
                      type='text'
                      className='form-control mb-2'
                      placeholder='Username'
                       />
                    <label>First and Last Name</label>
                    <Field
                      name='name'
                      component='input'
                      type='text'
                      className='form-control mb-2'
                      placeholder='First and Last Name' />

                    <Field
                      name='email'
                      component={FieldInput}
                      type='text'
                      className='form-control mb-2'
                      placeholder='Email'
                      label="Email"
                      required={true}
                       />
                    <label>Phone Number</label>
                    <Field
                      name='phone'
                      component='input'
                      type='text'
                      className='form-control mb-2'
                      placeholder='Phone Number' />

                    <label>Home Phone</label>
                    <Field
                      name='home_phone'
                      component='input'
                      type='text'
                      className='form-control mb-2'
                      placeholder='Home Phone Number' />

                    <label>Address Line 1</label>
                    <Field
                      name='address_line1'
                      component='input'
                      type='text'
                      className='form-control mb-2'
                      placeholder='Address Line 1' />

                    <label>Address Line 2</label>
                    <Field
                      name='address_line2'
                      component='input'
                      type='text'
                      className='form-control mb-2'
                      placeholder='Address Line 2' />

                      <Row>
                        <Col md="12">
                        <label>City</label>
                        <Field
                          name='city'
                          component='input'
                          type='text'
                          className='form-control mb-2'
                          placeholder='City' />
                        </Col>

                        <Col md="6">
                        <label>State</label>
                        <Field name="state" component="select" className="form-control mb-2">
                          <option />
                          {States().map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                        </Field>
                        </Col>
                        <Col md="6">
                          <label>Zip</label>
                          <Field
                            name='zip'
                            component='input'
                            type='text'
                            className='form-control mb-2'
                            placeholder='Zip Code' />
                        </Col>
                      </Row>

                    <button className='btn button btn-block mt-4'>
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default EditProfileModal
