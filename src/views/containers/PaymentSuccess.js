import { connect }          from 'react-redux'
import Component            from 'views/components/PaymentSuccess'

const mapStateToProps = (state, ownProps) => {
  return {
    payment: state.payment.paymentTracking
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
