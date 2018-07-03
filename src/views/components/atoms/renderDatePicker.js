import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import DatePicker           from 'react-datepicker'
import moment               from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class renderDatePicker extends Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.bool,
    }),
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    placeholder: '',
    minDate: moment(),
    maxDate: moment().add(30, 'days')
  }

  handleChange = (date) => {
    this.props.input.onChange(moment(date).format('YYYY-MM-DD'))
  }

  render () {
    const { input, placeholder, minDate, maxDate, meta: {touched, error}, className } = this.props

    return (
      <div className="date-picker">
        <DatePicker
          {...input}
          placeholder={placeholder}
          className={className}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat='YYYY-MM-DD'
          selected={input.value ? moment(input.value) : null}
          onChange={this.handleChange}
        />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }
}

export default renderDatePicker
