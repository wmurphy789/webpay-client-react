import { connect }                      from 'react-redux'
import Component                        from 'views/components/MessageCenter'
import { reduxForm }                    from 'redux-form'
import { createMessage, getMessages }   from 'core/message'
import { validate }                     from './validations'

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.user.loading || false,
    user: state.user || null,
    messages: state.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendMessage: (message) => dispatch(createMessage(message)),
    getMessages: () => dispatch(getMessages())
  }
}

const FormComponent = reduxForm({
  form: 'message_center',
  validate: validate
})(Component)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)
