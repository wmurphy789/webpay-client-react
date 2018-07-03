import { connect }        from 'react-redux'
import Component          from 'views/components/RecurringPayments'
import {
  getRecurringPayments,
  deleteRecurringPayment
}                         from 'core/recurring_payment'

const mapStateToProps = (state, ownProps) => {
  return {
    recurring_payment: state.recurring_payment,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRecurringPayments: () => dispatch(getRecurringPayments()),
    deleteRecurringPayment: (id) => dispatch(deleteRecurringPayment(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
