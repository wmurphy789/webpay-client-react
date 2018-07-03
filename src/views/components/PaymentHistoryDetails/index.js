import React, { Component }         from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';

class PaymentHistoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_id: this.props.payment_id || 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      payment_id: nextProps.payment_id,
      payment: nextProps.payment
    })
  }

  render() {
    const { payment, payment_id } = this.state
    if(!payment) {
      return (<div></div>)
    }
    return (
      <div className="col-md-4">
        <Collapse isOpen={payment.id === payment_id}>
          <Card>
            <CardBody>
              <table className="table table-striped">
                <tbody>
                  <tr><td colSpan="2"><strong>Account Description</strong></td></tr>
                  {payment.bank_name ?
                    <tr>
                      <td>Bank Name:</td>
                      <td>{payment.bank_name}</td>
                    </tr> :
                    <tr></tr>
                  }

                  <tr>
                    <td>Account Number:</td>
                    <td>{payment.hidden_account_number}</td>
                  </tr>
                  <tr>
                    <td>Confirmation Sent:</td>
                    <td>{payment.confirmation_email}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td>{payment.status}</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default PaymentHistoryDetails;
