import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import numeral                from 'numeral'
import { merge }              from 'lodash'

export default class Amount extends Component {
  render() {
    const size = this.props.size || 40
    const precision = typeof this.props.precision !== 'undefined' ? this.props.precision : 2
    const styles = merge({
      container: {
        flexDirection: 'row'
      },
      symbol: {
        color: '#242626',
        fontSize: size*.75,
        alignSelf: 'baseline',
        marginRight: 5
      },
      round: {
        color: '#292929',
        fontSize: size
      },
      cents: {
        color: '#292929',
        fontSize: size
      },
    }, this.props.style || {})
    const symbol = this.props.symbol || '$'
    const value = Number(this.props.amount / 100).toFixed(2)
    var integer = parseInt(value, 10)
    let decimal_node = (
      <span></span>
    )
    if (precision > 0) {
      let decimal = numeral(value % 1 * Math.pow(10, precision)).format('0'.repeat(precision))
      decimal_node = (
        <span style={styles.cents}>.{decimal}</span>
      )
    } else if(precision === 0){
      integer = Number(this.props.amount)
    }
    return (
      <span style={styles.container}>
        <span style={styles.round}>
          <span style={styles.symbol}>{symbol}&nbsp;</span>
          {integer.toLocaleString()}
          { decimal_node }
        </span>
      </span>
    )
  }
}

Amount.propTypes = {
  amount: PropTypes.number,
  size: PropTypes.number,
  symbol: PropTypes.string,
  style: PropTypes.object,
  precision: PropTypes.number,
}
