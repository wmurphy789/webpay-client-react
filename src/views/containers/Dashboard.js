import { connect } 		 from 'react-redux'
import Component 			 from 'views/components/Dashboard'
import { getAccount }  from 'core/account'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    account: state.account
  }
}

export default connect(
  mapStateToProps,
  { getAccount }
)(Component)
