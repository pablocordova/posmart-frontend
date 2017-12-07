
// -- Exteral modules

// Main module
import React, { Component } from 'react'
// Other modules
import { Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

// -- Own Modules
import {
  hideCompleteReceipt
} from '../actions/receipts'

class ViewReceipt extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Modal show = { this.props.isVisibleCompleteReceipt }>
            <Modal.Header>
              <Modal.Title>NOTA DE VENTA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Test</div>
            </Modal.Body>
            <Modal.Footer>
              <RaisedButton
                label = 'OK'
                primary = { true }
                onClick = { () =>
                  this.props.hideCompleteReceipt()
                }
              />
            </Modal.Footer>
          </Modal>
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    isVisibleCompleteReceipt: state.receipts.isVisibleCompleteReceipt,
    saleSelected: state.receipts.saleSelected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideCompleteReceipt() {
      dispatch(hideCompleteReceipt())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewReceipt)