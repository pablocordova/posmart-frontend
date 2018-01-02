
// -- External Modules

// Main module
import React, { Component } from 'react'
// Other modules
import { indigo500, green500 } from 'material-ui/styles/colors';
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Icons
import ActionPrint from 'material-ui/svg-icons/action/print';
import ContentSave from 'material-ui/svg-icons/content/save';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle';
import _ from 'lodash'

import 'font-awesome/css/font-awesome.min.css';

// -- Own Modules
import {
  clearDataSale,
  deleteProductInSale,
  saveSale,
  saveAndPrintSale,
  updateStateSale
} from '../actions/sale'

import {
  loadClients,
  resetClient
} from '../actions/clients'

import {
  modifyProductInSale
} from '../actions/products'

// Styles

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    accent1Color: green500
  }
});

const miniatureStyle = {
  color: 'grey',
  fontSize: 8
}

const receiptTitleStyle = {
  display: 'inline-block',
  margin: '0 0 10px 0',
  color: '#3F51B5'
}

const labelClientStyle = {
  marginLeft: '40px',
  display: 'inline-block'
}

const toggleStyle = {
  marginTop: '10px'
}

class ListProducts extends Component {

  componentDidMount() {
    this.props.loadClients()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <div>
            <h2 style = { receiptTitleStyle }>NOTA DE VENTA</h2>
            <div className = 'pull-right'>
              <RaisedButton
                label = 'GUARDAR E IMPRIMIR'
                secondary = { true }
                icon = { <ActionPrint /> }
                disabled = { this.props.disabledButton }
                style = {
                  {
                    marginRight: 12
                  }
                }
                onClick = { () => {
                  this.props.clearDataSale()
                  this.props.resetClient()
                  this.props.saveAndPrintSale(
                    this.props.productsSale,
                    this.props.clientIDForSale,
                    this.props.stateSale
                  )
                }}
              ></RaisedButton>
              <RaisedButton
                label = 'GUARDAR'
                disabled = { this.props.disabledButton }
                icon = { <ContentSave /> }
                style = {
                  {
                    marginRight: 12
                  }
                }
                onClick = { () => {
                  this.props.clearDataSale()
                  this.props.resetClient()
                  this.props.saveSale(
                    this.props.productsSale,
                    this.props.clientIDForSale,
                    this.props.stateSale
                  )
                }}
              ></RaisedButton>
              <RaisedButton
                label = 'NUEVO'
                disabled = { this.props.disabledButton }
                onClick = { () => {
                  this.props.clearDataSale()
                  this.props.resetClient()
                }}
              >
              </RaisedButton>
            </div>
          </div>

          <RaisedButton secondary = { true } className = 'display-inline-block'>
            <Link to = '/client' className = 'format-link-button'>
              <i className = 'fa fa-user'></i>&ensp; Cliente
            </Link>
          </RaisedButton>
          <h4 style = { labelClientStyle }>{ this.props.clientNameForSale }</h4>
          <Toggle
            label = 'Credito'
            style = { toggleStyle }
            toggled = { this.props.stateSale === 'Credito' }
            labelPosition = 'right'
            onToggle = { (event, isInputChecked) => {
              let stateSale = 'Pendiente'
              if (isInputChecked) {
                stateSale = 'Credito'
              }
              this.props.updateStateSale(stateSale)
            }}
          />
          <div className = 'text-align-right'>
            <h2 className = 'margin-top-zero'>TOTAL: S/. { this.props.totalSale }</h2>
          </div>
          <div>
            <Table responsive>
              <thead>
                <tr className = 'text-center-header-table'>
                  <th style = { miniatureStyle }>Nro.</th>
                  <th>Cant.</th>
                  <th>Med.</th>
                  <th>Descripción</th>
                  <th>P.Unit</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className = 'row-table-selected'>
                {
                  this.props.productsSale.map((product, index) => {
                    return (
                      <tr key = { index } className = 'text-center'>
                        <td style = { miniatureStyle }>{ index + 1 }</td>
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
                          { _.round(product.total / product.quantity, 2) }
                        </td>
                        <td>
                          { product.total }
                        </td>
                        <td className = 'spread-two-icons'>
                          <i
                            className = 'fa fa-pencil fa-lg'
                            id = { index }
                            onClick = { (e) => {
                              // Here I need to filter the respective product, and pass
                              let product = this.props.productsSale.filter((productSale, index) =>
                                index === parseInt(e.target.id, 10)
                              ).pop()
                              this.props.modifyProductInSale(product)
                            }}
                          ></i>
                          <i className = 'fa fa-trash fa-lg' id = { index } onClick = { (e) =>
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
    clientNameForSale: state.clients.clientNameForSale,
    stateSale: state.sale.stateSale
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
    modifyProductInSale(productToModify) {
      dispatch(modifyProductInSale(productToModify))
    },
    resetClient() {
      dispatch(resetClient())
    },
    saveAndPrintSale(productsSale, clientID, state) {
      dispatch(saveAndPrintSale(productsSale, clientID, state))
    },
    saveSale(productsSale, clientID, state) {
      dispatch(saveSale(productsSale, clientID, state))
    },
    updateStateSale(stateSale) {
      dispatch(updateStateSale(stateSale))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts)