import React                                      from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { Field }                                  from 'redux-form'
import FieldInput                                 from 'views/components/atoms/FieldInput'

class ChangePasswordModal extends React.Component {
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

  updatePassword = (values) => {
    this.props.updatePassword(values)
    this.setState({modal: false});
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <NavLink
          style={{'marginLeft': '8px'}}
          onClick={this.toggle}>
          Change Password
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Update Password</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <div className="mx-auto">
                  <form onSubmit={ handleSubmit(this.updatePassword) }>
                    <Field
                      name='current_password'
                      component={FieldInput}
                      type='password'
                      className='form-control'
                      placeholder='Current Password' />

                    <Field
                      name='password'
                      component={FieldInput}
                      type='password'
                      className='form-control mt-2'
                      placeholder='Password' />

                    <Field
                      name='password_confirmation'
                      component={FieldInput}
                      type='password'
                      className='form-control mt-2'
                      placeholder='Confirmation Password' />

                    <button className='btn button btn-block mt-4'>
                      Change Password
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

export default ChangePasswordModal
