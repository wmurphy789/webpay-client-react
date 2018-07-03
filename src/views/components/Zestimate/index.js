import React, { Component } from 'react'
import { Link }             from 'react-router-dom'
import Amount               from 'views/components/atoms/Amount'
import zillowImage          from './Zillowlogo_200x50.gif'
import styles               from 'views/components/atoms/Styles'

class Zestimate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zestimate_low: 0.0,
      zestimate_high: 0.0,
      zesitmate_url: 'https//www.zillow.com'
    }
  }

  componentWillMount() {
    const { loan } = this.props

    var zestimate = (
      Object.keys(loan).length > 1 ? JSON.parse(loan.valuation) : {
        "low": 0,
        "high": 0,
        "url": "https://www.zillow.com"
      }
    );

    this.setState({
      zestimate_low: zestimate["low"],
      zestimate_high: zestimate["high"],
      zesitmate_url: zestimate["url"]
    });
  }

  render() {
    const {
      zestimate_low,
      zestimate_high,
      zesitmate_url
    } = this.state

    return (
      <div className='row'>
        <div className="col-md-6">
          <small>Zestimate</small><br/>
          <span>
            <Amount
              style={{container:styles.separate_top}}
              amount={parseInt(zestimate_low, 10)}
              size={styles.container_progress_amount.fontSize}
              precision={0} />
          </span> - <span>
            <Amount
              style={{container:styles.separate_top}}
              amount={parseInt(zestimate_high, 10)}
              size={styles.container_progress_amount.fontSize}
              precision={0} />
          </span>
        </div>
        <div className="col-md-6">
          <Link to={zesitmate_url} target="_blank">
            <img src={zillowImage} alt="Zillow" />
          </Link>
        </div>
      </div>
    )
  }

}

export default Zestimate
