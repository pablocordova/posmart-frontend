import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {

  render() {
    return (
      <div>Hello world receipts</div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)