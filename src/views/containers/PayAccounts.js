import { connect }    from 'react-redux'
import Component      from 'views/components/PayAccounts'
import {
  getPaymentAccounts,
  deletePayAccount,
  setDefaultAccount
}                     from 'core/pay_account'

const mapStateToProps = (state, ownProps) => {
  return {
    pay_accounts: state.pay_account.data,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPaymentAccounts: () => dispatch(getPaymentAccounts()),
    deletePayAccount: (id) => dispatch(deletePayAccount(id)),
    setDefaultAccount: (id) => dispatch(setDefaultAccount(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
