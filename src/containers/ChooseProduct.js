import React, { Component } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import DetailProduct from './DetailProduct'
import './styles.css'
import { loadProducts, showDetailProduct, filterProducts } from '../actions/products'

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
        <h2>PRODUCTO</h2>
        <form>
          <FormGroup>
            <FormControl
              type = 'text'
              value = { this.state.textProduct }
              placeholder = 'Buscar Producto'
              onChange = { e =>this.filterProductss(e) }
            />
          </FormGroup>
        </form>
        <MuiThemeProvider>
          <Table onCellClick = { (row) => {
            this.props.showDetailProduct(true, this.props.productsFiltered[row])
          }}>
            <TableBody
              displayRowCheckbox = { false }
            >
              {
                this.props.productsFiltered.map(product => {
                  return (
                    <TableRow key = { product._id } >
                      {/* <TableRowColumn>{ product.picture }</TableRowColumn> */}
                      <TableRowColumn>
                        <h4>{ product.name }</h4>
                        <div className = 'block-sample-prices'>
                          {
                            product.prices.map((entry, index) => {
                              return (
                                <div className = 'sample-prices' key = { index }>
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
                      </TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </MuiThemeProvider>
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
    loadProducts() {
      dispatch(loadProducts())
    },
    showDetailProduct(state, selectedProduct) {
      dispatch(showDetailProduct(state, selectedProduct))
    },
    filterProducts(string) {
      dispatch(filterProducts(string))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseProduct)