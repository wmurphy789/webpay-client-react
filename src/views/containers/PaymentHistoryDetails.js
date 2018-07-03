import { connect }  from 'react-redux'
import Component    from 'views/components/PaymentHistoryDetails'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    payments: state.payment.data,
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
