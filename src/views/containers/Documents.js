import { connect }          from 'react-redux'
import Component            from 'views/components/Documents'
import { getDocumentForm }  from 'core/document'
import { getDocuments }     from 'core/document'
import { reduxForm }        from 'redux-form'

const mapStateToProps = (state, ownProps) => {
  const getForm = getDocumentForm()
  return {
    user: state.user,
    documents: state.document,
    initialValues: getForm(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDocuments: (query) => dispatch(getDocuments(query))
  }
}

const FormComponent = reduxForm({
  form: 'search_documents',
  enableReinitialize: true
})(Component)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)
