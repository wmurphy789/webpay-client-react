import React                                     from 'react'
import { Field }                                 from 'redux-form'
import { formatAvailableDays }                   from 'utils/custom_services'
import FieldCheckbox                             from 'views/components/atoms/FieldCheckbox'
import FieldSelect                               from 'views/components/atoms/FieldSelect'

class EditAlertPreferencesModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alert_method: this.props.initialValues.alert_method
    }

    this.days = formatAvailableDays();
  }

  updateAlertPreferences = (values) => {
    this.props.updateAlertPreferences(values)
  }

  render() {
    const { handleSubmit } = this.props

    return (
        <form onSubmit={ handleSubmit(this.updateAlertPreferences) }>
          <h3 className="mb-3">Select Alerts You Would Like To Receive</h3>

          <div className="row">
            <div className="col-md-12 mt-1">
              <p>Please check which types of documents you would like to receive electronically.
              The email and mobile number provided in your profile will be used in all your notificaitons.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
             <strong>Payment Posted</strong>
            </div>
            <div className="col-md-2">
             <strong>Email</strong>
            </div>
            <div className="col-md-2">
             <strong>SMS/Text</strong>
            </div>
            <div className="col-md-2">
             <strong>Push Notification</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              Send alert if payment is not received by the
                <div className="d-inline-block margin-horizontal">
                  <Field
                    name="day_of_month"
                    component={FieldSelect}
                    className="form-control">
                    <option>Choose a Day</option>
                    {this.days.map(day => {
                      return (
                        <option value={day.key} key={day.key}>{day.label}</option>
                      )
                     })}
                  </Field>
                </div>
                  day of the month
            </div>

            <div className="col-md-2">
              <Field
                name={`payment_not_received.email`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>

            <div className="col-md-2">
              <Field
                name={`payment_not_received.sms`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>

            <div className="col-md-2">
              <Field
                name={`payment_not_received.push_notification`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>

          </div>
          <div className="row">
            <div className="col-md-8">
             <strong>Payment Posted </strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
             <span className="lined">Send alert when a payment is posted.</span>
            </div>
            <div className="col-md-2">
              <Field
                name={`payment_posted.email`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>

            <div className="col-md-2">
              <Field
                name={`payment_posted.sms`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>

            <div className="col-md-2">
              <Field
                name={`payment_posted.push_notification`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
             <strong>Recurring Payment to be Posted </strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
             <span className="lined">Send alert when a recurring payment is to be posted.</span>
            </div>
            <div className="col-md-2">
              <Field
                name={`recurring_posted.email`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>

            <div className="col-md-2">
              <Field
                name={`recurring_posted.sms`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>

            <div className="col-md-2">
              <Field
                name={`recurring_posted.push_notification`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
             <strong>IRS Documents</strong>
            </div>
            <div className="col-md-2">
             <strong>Paperless</strong>
            </div>
            <div className="col-md-2">
             <strong>Email</strong>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
             <span className="lined">Receive IRS Documents</span>
            </div>
            <div className="col-md-2">
              <Field
                name={`irs_documents.electronic`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>

            <div className="col-md-2">
              <Field
                name={`irs_documents.email`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
             <strong>Billing Statements</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
             <span className="lined">Receive Billing Statements</span>
            </div>
            <div className="col-md-2">
              <Field
                name={`billing_statements.electronic`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>

            <div className="col-md-2">
              <Field
                name={`billing_statements.email`}
                component={FieldCheckbox}
                label=""
                type="checkbox"/>
            </div>
          </div>

          <div className="mt-2 mb-2">
            <span><em>Federal Regulations allow you to elect to turn off notifications about the
              availability of your electronic loan documents, such as your billing statements option.</em></span>
            <br />
            <span><em>Electronic notification about the availability of your electronic IRS documents
              are required by law and cannot be turned off.</em></span>
          </div>

          <button className='btn button float-right mt-4'>
            Update Alert Preferences
          </button>
        </form>

    )
  }
}

export default EditAlertPreferencesModal
