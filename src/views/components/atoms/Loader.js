import React, { Component } from 'react'
import ReactLoading         from 'react-loading';

class Loader extends Component {

  render () {
    const type = "spinningBubbles"
    const height = '100px'
    const width = '100px'
    const color = '#444'
    const label = this.props.label || null

    return (
      <div className="loader">
        <h2>{label}</h2>
        <ReactLoading type={type} color={color} height={height} width={width} />
      </div>
    )
  }
}

export default Loader
