import React, { Component } from 'react'
import { connect } from 'react-redux'

class ListProducts extends Component {

  render() {
    return (
      <div>
        <div>Hello List Products</div>
        <div>Hello List Products</div>
        <div>Hello List Products</div>
        <div>Hello List Products</div>
        <div>Hello List Products</div>
        <div>Hello List Products</div>
        <div>Hello List Products</div>
        <div>Hello List Products</div>
        <div>Hello List Products</div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    chosenProduct: 'asd'
  }
}
/*
const mapDispatchToProps = dispatch => {

}
*/
export default connect(
  mapStateToProps
)(ListProducts)