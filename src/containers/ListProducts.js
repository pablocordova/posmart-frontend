
// External Modules

// Main module
import React, { Component } from 'react'
// Other modules
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

import 'font-awesome/css/font-awesome.min.css';
import './styles.css'

// Own Modules
import {
  deleteProductInSale,
  saveSale,
  saveAndPrintSale
} from '../actions/sale'

class ListProducts extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h2>NOTA DE VENTA</h2>
          <RaisedButton
            label = 'GUARDAR E IMPRIMIR'
            primary = { true }
            onClick = { () =>
              this.props.saveAndPrintSale(this.props.productsSale)
            }
          ></RaisedButton>
          <RaisedButton
            label = 'GUARDAR'
            primary = { true }
            onClick = { () =>
              this.props.saveSale(this.props.productsSale)
            }
          ></RaisedButton>
          <h1>TOTAL: { this.props.totalSale }</h1>
          <Table responsive>
            <thead>
              <tr>
                <th hidden></th>
                <th>Cant</th>
                <th>Unid</th>
                <th>Descripción</th>
                <th>Unid</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.productsSale.map((product, index) => {
                  return (
                    <tr key = { index }>
                      <td hidden = { true }>{ product.id }</td>
                      <td>
                        { product.amount }
                      </td>
                      <td>
                        { product.unit }
                      </td>
                      <td>
                        { product.name }
                      </td>
                      <td>
                        { product.price }
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
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  console.log(state.sale)
  return {
    productsSale: state.sale.productsSale,
    totalSale: state.sale.totalSale
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProductInSale(index) {
      dispatch(deleteProductInSale(index))
    },
    saveAndPrintSale(productsSale) {
      dispatch(saveAndPrintSale(productsSale))
    },
    saveSale(productsSale) {
      dispatch(saveSale(productsSale))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProducts)