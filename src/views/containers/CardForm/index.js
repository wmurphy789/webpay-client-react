import { connect }            from 'react-redux'
import { reduxForm }          from 'redux-form'
import Component              from 'views/components/CardModal'
import { createCardAccount }  from 'core/pay_account'
import { validate }           from './validations'

const mapStateToProps = (state, ownProps) => {
  return { }
}

const FormComponent = reduxForm({
  form: 'card',
  validate: validate,
  initialValues: {
    default: false
  }
})(Component)

export default connect(
  mapStateToProps,
  {
    createCardAccount
  }
)(FormComponent)
