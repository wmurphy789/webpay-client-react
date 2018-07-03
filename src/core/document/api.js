import { getResponseData } from 'core/api/helpers'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/v1/documents?`;
const URL = (query) => {
  let url = ENDPOINT
  if(query) {
    url += `page_number=${"page_number" in query ? query["page_number"] : 1 }`
    
    if(query["document_type_id"]) {
      url += `document_type_id=${query["document_type_id"]}&`
    }

    if(query["start_date"]) {
      url += `start_date=${query["start_date"]}&`
    }

    if(query["end_date"]) {
      url += `end_date=${query["end_date"]}`
    }
  }

  return url;
}

export default {

  getDocuments: (token, query) => {

    return fetch(URL(query), {
    	method: 'GET',
    	headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  },

}
