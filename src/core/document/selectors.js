import { createSelector } from 'reselect'
import moment             from 'moment';

const getDocuments = (state) => {
  return state.documents
}

export const getDocumentForm = () => createSelector(
  [getDocuments],
  (documents) => {
    var start_date = new Date();
    start_date.setMonth(start_date.getMonth() - 1);

    return {
      document_type_id: null,
      start_date: String(moment(start_date).format("YYYY-MM-DD")),
      end_date: String(moment(new Date()).format("YYYY-MM-DD")),
    }
  }
)
