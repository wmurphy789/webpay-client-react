import React, { Component }   from 'react'
import Loader                 from 'views/components/atoms/Loader'
import moment                 from 'moment'
import Amount                 from 'views/components/atoms/Amount'
import PaymentHistoryDetails  from 'views/containers/PaymentHistoryDetails'
import { Button }             from 'reactstrap';
import ReactPaginate          from 'react-paginate'

class PaymentHistory extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      total_pages: 0,
      current_page: 0,
      payment_id: 0
    };
  }

  componentWillMount() {
    this.props.getPayments()
  }

  componentWillReceiveProps(nextProps) {
    let meta = nextProps.payments.data.length > 0 ? nextProps.payments.meta : {"total_pages": 1, "current_page": 1}

    this.setState({
      total_pages: meta["total_pages"],
      current_page: meta["current_page"]
    })
  }

  toggle(payment) {
    this.setState({
      payment_id: (payment.id === this.state.payment_id ? null : payment.id)
    });
  }

  handlePageClick = (data) => {
    let selected = data.selected + 1
    this.props.getPayments({page_number: selected})
  }

  render() {
    const { payments, user } = this.props
    const { data } = payments

    if(payments.loading) {
      return (<Loader />)
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

          <div className="row">
            <div className="col-md-12">

              <table className="table table-row-bordered">
                  <thead>
                    <tr>
                      <th>Confirmation</th>
                      <th>Amount</th>
                      <th>Payment Date</th>
                      <th>Date Posted</th>
                      <th>Sources</th>
                      <th></th>
                    </tr>
                  </thead>
                    {data ? (data.map(payment => {
                      return (
                        <tbody key={payment.id}>
                          <tr >
                            <td className="align-middle">{payment.tracking}</td>
                            <td className="align-middle"><Amount amount={payment.total_payment} size={13}/></td>
                            <td className="align-middle">{moment(payment.transaction_date).format('MM/DD/YY')}</td>
                            <td className="align-middle">{moment(payment.client_post_date).format('MM/DD/YY')}</td>
                            <td className="align-middle">{payment.source}</td>
                            <td>
                              <Button color="primary" onClick={(e) => this.toggle(payment)} className="btn-sm">
                                <i className="fa fa-eye" aria-hidden="true"></i> Details
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="6">
                              <PaymentHistoryDetails payment={payment} payment_id={this.state.payment_id} key={payment.id} />
                            </td>
                          </tr>
                        </tbody>
                      )
                    })) : (
                      <tr>
                        <td colspan="6" align="center">No payments found</td>
                      </tr>
                    )
                  }
              </table>

              <div className="text-xs-center">
                { payments.data.length > 0  &&
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
    );
  }
}

export default PaymentHistory
