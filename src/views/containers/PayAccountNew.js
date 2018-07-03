import { connect }                              from 'react-redux'
import Component                                from 'views/components/PayAccountModal'
import { createCardAccount, createBankAccount } from 'core/pay_account'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  {
    createBankAccount,
    createCardAccount
  }
)(Component)
