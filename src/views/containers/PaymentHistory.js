import { connect }      from 'react-redux'
import Component        from 'views/components/PaymentHistory'
import { getPayments }  from 'core/payment'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    payments: state.payment,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPayments: (query) => dispatch(getPayments(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
