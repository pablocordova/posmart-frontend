import React, { Component } from 'react'
import { FormGroup, FormControl, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
//import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import DetailProduct from './DetailProduct'
import {
  filterProducts,
  loadProducts,
  showDetailProduct
} from '../actions/products'
// Styles

const nameProductStyle = {
  fontFamily: 'Times, "Times New Roman", serif'
}

const separatorPricesStyle = {
  margin: '15px auto'
}

const heightTableStyle = {
  height: '450px',
  overflow: 'scroll'
}

class ChooseProduct extends Component {

  constructor() {
    super()
    // Local state form handle input text for search product in table
    this.state = {
      textProduct: ''
    }
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  filterProductss(e) {
    const textToSearch = e.target.value
    this.setState({
      textProduct: textToSearch
    });
    this.props.filterProducts(textToSearch)
  }

  render() {

    return (
      <div>
        <h2 className = 'margin-top-zero'>PRODUCTO</h2>
        <form>
          <FormGroup>
            <FormControl
              type = 'text'
              value = { this.state.textProduct }
              placeholder = 'Buscar Producto'
              onChange = { e => this.filterProductss(e) }
            />
          </FormGroup>
        </form>
        <div style = { heightTableStyle }>
          <Table>
            <tbody
              className = 'row-table-selected'
            >
              {
                this.props.productsFiltered.map(product => {
                  return (
                    <tr key = { product._id } onClick = { e => {
                      let index = 0
                      if (e.target.attributes.index) {
                        index = parseInt(e.target.attributes.index.value, 10)
                      }

                      this.props.showDetailProduct(
                        this.props.productsFiltered[e.currentTarget.rowIndex],
                        e.target.className,
                        e.target.id,
                        index
                      )

                    } }>
                      {/* <TableRowColumn>{ product.picture }</TableRowColumn> */}
                      <td className = 'padding-sides-zero text-center'>
                        <h4 style = { nameProductStyle }>{
                          product.name
                        }</h4>
                        <div style = { separatorPricesStyle }>
                          {
                            product.prices.map((entry, index) => {
                              return (
                                <div
                                  className = 'flag-price-samples'
                                  key = { index }
                                  id = { entry.price }
                                  index = { index }
                                >
                                  { entry.quantity }
                                  { ' ' }
                                  { entry.name }
                                  { ': S./'}
                                  { entry.price }
                                </div>
                              )
                            })
                          }
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
        <DetailProduct/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    productsFiltered: state.products.productsFiltered
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterProducts(string) {
      dispatch(filterProducts(string))
    },
    loadProducts() {
      dispatch(loadProducts())
    },
    showDetailProduct(selectedProduct, className, option, index) {
      dispatch(showDetailProduct(selectedProduct, className, option, index))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseProduct)