
// -- Exteral modules

// Main module
import React, { Component } from 'react'
// Other modules
import { Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { green500, indigo500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton'
import _ from 'lodash'

// -- Own Modules
import {
  hideCompleteReceipt,
  printSale
} from '../actions/receipts'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    accent1Color: green500
  }
});

const headerModalStyle = {
  textAlign: 'center',
  background: '#3F51B5',
  color: 'white',
  paddingBottom: '10px',
  paddingTop: '15px'
}

class ViewReceipt extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <Modal show = { this.props.isVisibleCompleteReceipt }>
            <Modal.Header style = { headerModalStyle}>
              <Modal.Title>NOTA DE VENTA
                <RaisedButton
                  label = 'IMPRIMIR'
                  className = 'pull-right'
                  onClick = { () => {
                    this.props.printSale(this.props.saleSelected._id)
                    this.props.hideCompleteReceipt()
                  }}
                ></RaisedButton>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Vendedor: { this.props.saleSelected.seller }</div>
              <div>Fecha: { moment.utc(this.props.saleSelected.date).format('DD/MM/YY') }</div>
              <div>Hora: { moment.utc(this.props.saleSelected.date).format('hh:mm:ss a') }</div>
              <div>Cliente: { this.props.saleSelected.client.name }</div>
              <h3>TOTAL: { this.props.saleSelected.total }</h3>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Cant.</th>
                    <th>Med.</th>
                    <th>Descripcion</th>
                    <th>P.Unit</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.saleSelected.products.map(product => {
                      let unitPrice = product.total / (product.unitsInPrice * product.quantity);
                      return (
                        <tr key = { product.id } >
                          <td>{ product.quantity }</td>
                          <td>{ product.measure }</td>
                          <td>{ product.name }</td>
                          <td>{ _.round(unitPrice, 2) }</td>
                          <td>{ product.total }</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <RaisedButton
                label = 'OK'
                secondary = { true }
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
    },
    printSale(idReceipt) {
      dispatch(printSale(idReceipt))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewReceipt)