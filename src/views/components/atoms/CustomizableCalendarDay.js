import React, { Component } from 'react'
import moment               from 'moment';
import {formatAmount}       from 'utils/custom_services'

export default class CustomizableCalendarDay extends Component {

  render() {
    const { _d, details } = this.props

    if (!_d) return <span></span>;

    var formattedDate = moment(_d, 'YYYY/MM/DD').format('D');

    return (
      <span>
        <h2>{formattedDate}</h2>
        {details ?
          <span>{formatAmount(details)}</span> :
          <span></span>
        }
      </span>
    )
  }
}
