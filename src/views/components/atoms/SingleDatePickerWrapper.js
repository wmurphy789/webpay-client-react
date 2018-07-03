// Props that can be passed:
// - disabled_days(Array)
// - month_span(Int): Number of months to show into the future
// - min_date(Date): Min date to show on calendar
// - id(String)
// - size(Int): size of box
// - details(String): (ie) Late fees
// - due_date(Date): due date of payment
// - numberOfMonths(Int): number of months to show per slide
// - name(String): name of input

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React, { Component }         from 'react'
import { SingleDatePicker }         from 'react-dates';
import CustomizableCalendarDay      from './CustomizableCalendarDay'
import moment                       from 'moment';
import { FormGroup, Label }         from 'reactstrap'

export default class SingleDatePickerWrapper extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      date: (!props.input.value || props.input.value === '') ? null : moment(props.input.value),
      focused: false,
      touched: false
    }

    this.isDayBlocked = this.isDayBlocked.bind(this)
    this.isOutsideRange = this.isOutsideRange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
  }

  isDayBlocked(day) {
    const disabled_days = this.props.disabled_days || []

    if(disabled_days.includes(day.format('YYYY-MM-DD'))) {
      return true
    }
  }

  isOutsideRange(day) {
    const month_span = this.props.month_span || 6
    const min_date = this.props.min_date || moment()

    return !(day.diff(moment(), 'months') < month_span && day >= min_date)
  }

  onDateChange(date) {
    this.setState({ date })
    this.props.input.onChange(moment(date).format('YYYY-MM-DD'))
  }

  onFocusChange() {
    this.setState({ focused: !this.state.focused, touched: true })
  }

  render() {
    const id = this.props.name || "input"
    const size = this.props.size || 56
    const due_date = this.props.due_date || moment().startOf('month')
    const numberOfMonths = this.props.numberOfMonths || 1
    const {input, placeholder, meta: {error}, details, required, label } = this.props

    return (
      <FormGroup>
        <Label for={input.name}>
          {required && <abbr title="required">*</abbr> }
          {label}
        </Label>
        <SingleDatePicker
          id={id}
          placeholder={placeholder}
          date={this.state.date}
          onDateChange={this.onDateChange}
          focused={this.state.focused}
          showDefaultInputIcon
          daySize={size}
          required={required}
          numberOfMonths={numberOfMonths}
          onFocusChange={this.onFocusChange}
          renderDayContents={props => <CustomizableCalendarDay details={details} due_date={due_date} {...props} />}
          isDayBlocked={this.isDayBlocked}
          hideKeyboardShortcutsPanel={true}
          isOutsideRange={this.isOutsideRange}
        />

        {this.state.touched && error && <span className="danger-text">{error}</span>}
      </FormGroup>
    )
  }
}
