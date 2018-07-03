import { connect }          from 'react-redux'
import Component            from 'views/components/Profile'
import { getProfile }       from 'core/profile'
import { getMessages }      from 'core/message'
const mapStateToProps = (state, ownProps) => {

  return {
    user: state.user,
    loading: state.profile.loading,
    profile: state.profile.data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProfile: () => dispatch(getProfile()),
    getMessages: () => dispatch(getMessages())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
