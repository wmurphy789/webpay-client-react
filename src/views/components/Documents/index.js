import React, { Component }     from 'react'
import { Link }                 from 'react-router-dom'
import Loader                   from 'views/components/atoms/Loader'
import { Field }                from 'redux-form'
import SingleDatePickerWrapper  from 'views/components/atoms/SingleDatePickerWrapper'
import moment                   from 'moment'
import ReactPaginate            from 'react-paginate'

class Documents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month_span: 12,
      total_pages: 0,
      current_page: 0
    };
  }

  componentWillMount() {
    this.props.getDocuments()
  }

  componentWillReceiveProps(nextProps) {
    let meta = nextProps.documents.data.length > 0 ? nextProps.documents.meta : {"total_pages": 1, "current_page": 1}

    this.setState({
      total_pages: meta["total_pages"],
      current_page: meta["current_page"]
    })
  }

  renderIcon(image) {
    if(image["type"] === "pdf") {
      return (<i className='fa fa-file-pdf-o' aria-hidden='true'></i>)
    }

    return (<i className='fa fa-file-image-o' aria-hidden='true'></i>)
  }

  handlePageClick = (data) => {
    let selected = data.selected + 1
    this.props.getDocuments({page_number: selected})
  }

  render() {
    const { documents, handleSubmit, user } = this.props

    if(documents.loading) {
      return ( <Loader /> )
    }

    return (
      <div className="card">
        <div className="row">
          <div className="col-md-6">
            <div className="float-left p-3">
              {`Loan: #${user.account_number} - ${user.name} `}
            </div>
          </div>
          <div className="col-md-6">
            <div className="float-right p-3">
              {moment().format('MM/DD/YY')}
            </div>
          </div>
        </div>

        <div className="card-block border-top">

        <div className="card search-bar border-0">
          <div className="card-block">
            <form onSubmit={ handleSubmit(this.props.getDocuments) }>
              <div className="row">
                <div className="col-md-12 p-2">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Document Type:</label>
                      <Field name="document_type_id" component="select" className="form-control">
                        <option>All Documents</option>
                        <option value="4">IRS Documents</option>
                        <option value="6">Statements</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <Field
                      name='start_date'
                      component={SingleDatePickerWrapper}
                      className='form-control'
                      placeholder='Start Date'
                      label="Start Date"
                      min_date={moment().subtract(1, 'years')}
                      month_span={this.state.month_span}
                    />
                  </div>
                  <div className="col-md-3">
                    <Field
                      name='end_date'
                      component={SingleDatePickerWrapper}
                      className='form-control'
                      placeholder='End Date'
                      label="End Date"
                      min_date={moment().subtract(1, 'years')}
                      month_span={this.state.month_span}
                    />
                  </div>

                  <div className="col-md-1">
                    <div className="form-group">
                      <button className='btn button btn-block'>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-block border-top">
            <div className="row">
              <div className="col-md-12">
                <table className="table table-row-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Documents</th>
                      </tr>
                    </thead>
                    <tbody className="table_rows">
                    {documents.data ? (documents.data.map(document => {
                        return (
                          <tr key={document.id}>
                            <td>{document.created_at}</td>
                            <td>{document.type}</td>
                            <td>
                              {document.image_urls.map((image, index) =>
                                <a target="_blank" href={image["url"]} className="col-sm-1 btn btn-sm reverse-button mr-2" key={index}>
                                  { this.renderIcon(image) }
                                </a>
                              )}
                            </td>
                          </tr>
                        )
                      })) : (
                        <tr>
                          <td colspan="3" align="center">No Documents found, make sure you are subscribed <Link to='/profile' className="simple_link">here</Link>.</td>
                        </tr>
                      )
                    }
                   </tbody>
                </table>

                <div className="text-xs-center">
                  { documents.data.length > 0  &&
                    <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.total_pages}
                       forcePage={parseInt(this.state.current_page, 10) - 1}
                       marginPagesDisplayed={5}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       disableInitialCallback={true}
                       containerClassName={"pagination text-center"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Documents
