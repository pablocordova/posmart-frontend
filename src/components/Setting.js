import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { getTokenGoogle, getPrinterData } from '../actions/settings'



class Setting extends Component {

  render() {
    return (
      <div>
        <Button
          bsStyle = "primary"
          onClick = { () => this.props.getTokenGoogle() }
        >
          Login
        </Button>
        <Button
          bsStyle = "primary"
          onClick = { () => this.props.getPrinterData() }
        >
          Get data Printer
        </Button>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPrinterData() {
      dispatch(getPrinterData())
    },
    getTokenGoogle() {
      dispatch(getTokenGoogle())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting)
