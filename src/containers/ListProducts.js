
// -- External Modules

// Main module
import React, { Component } from 'react'
// Other modules
import { indigo500, grey500 } from 'material-ui/styles/colors';
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import _ from 'lodash'

import 'font-awesome/css/font-awesome.min.css';
import './styles.css'

// -- Own Modules
import {
  clearDataSale,
  deleteProductInSale,
  saveSale,
  saveAndPrintSale
} from '../actions/sale'

import {
  loadClients,
  resetClient
} from '../actions/clients'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    accent1Color: grey500
  }
});

class ListProducts extends Component {

  componentDidMount() {
    this.props.loadClients()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <div>
            <h2 className = 'receipt-title'>NOTA DE VENTA</h2>
            <div className = 'pull-right'>
              <RaisedButton
                label = 'GUARDAR E IMPRIMIR'
                primary = { true }
                disabled = { this.props.disabledButton }
                style = {
                  {
                    marginRight: 12
                  }
                }
                onClick = { () => {
                  this.props.clearDataSale()
                  this.props.resetClient()
                  this.props.saveAndPrintSale(this.props.productsSale, this.props.clientIDForSale)
                }}
              ></RaisedButton>
              <RaisedButton
                label = 'GUARDAR'
                secondary = { true }
                disabled = { this.props.disabledButton }
                style = {
                  {
                    marginRight: 12
                  }
                }
                onClick = { () => {
                  this.props.clearDataSale()
                  this.props.resetClient()
                  this.props.saveSale(this.props.productsSale, this.props.clientIDForSale)
                }}
              ></RaisedButton>
              <RaisedButton
                label = 'NUEVO'
                secondary = { true }
                disabled = { this.props.disabledButton }
                onClick = { () => {
                  this.props.clearDataSale()
                  this.props.resetClient()
                }}
              ></RaisedButton>
            </div>
          </div>

          <h4 className = 'inline-block client-label'>Cliente: { this.props.clientNameForSale }</h4>
          <RaisedButton primary = { true } className = 'inline-block'>
            <Link to = '/client' className = 'link-clients'>Clientes</Link>
          </RaisedButton>
          <div className = 'total-label'>
            <h2>TOTAL: S/. { this.props.totalSale }</h2>
          </div>
          <div>
            <Table responsive>
              <thead>
                <tr>
                  <th hidden></th>
                  <th hidden></th>
                  <th>Cant.</th>
                  <th>Med.</th>
                  <th>Descripción</th>
                  <th>P.Unit</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.productsSale.map((product, index) => {
                    return (
                      <tr key = { index }>
                        <td hidden = { true }>{ product.product }</td>
                        <td hidden = { true }>{ product.priceIndex }</td>
                        <td>
                          { product.quantity }
                        </td>
                        <td>
                          { product.unit }
                        </td>
                        <td>
                          { product.name }
                        </td>
                        <td>
                          { _.round(product.total / (product.unitsInPrice * product.quantity), 2) }
                        </td>
                        <td>
                          { product.total }
                        </td>
                        <td>
                          <i className = 'fa fa-trash' id = { index } onClick = { (e) =>
                            this.props.deleteProductInSale(e.target.id)
                          }
                          ></i>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    disabledButton: state.sale.disabledButton,
    productsSale: state.sale.productsSale,
    totalSale: state.sale.totalSale,
    clientIDForSale: state.clients.clientIDForSale,
    clientNameForSale: state.clients.clientNameForSale
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearDataSale() {
      dispatch(clearDataSale())
    },
    deleteProductInSale(index) {
      dispatch(deleteProductInSale(index))
    },
    loadClients() {
      dispatch(loadClients())
    },
    resetClient() {
      dispatch(resetClient())
    },
    saveAndPrintSale(productsSale, clientID) {
      dispatch(saveAndPrintSale(productsSale, clientID))
    },
    saveSale(productsSale, clientID) {
      dispatch(saveSale(productsSale, clientID))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts)