import React, { Component } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { 
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
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

    return(
      <div>
        <h3>PRODUCTO</h3>
        <form>
          <FormGroup>
            <FormControl
              type = 'text'
              value = { this.state.textProduct }
              placeholder = 'Buscar Producto'
              onChange = { string => this.filterProductss(string) }
            />
          </FormGroup>
        </form>
        <div className = 'block-sample-prices'>
          <p className = 'sample-prices'>Unidad: S./12</p>
          <p className = 'sample-prices'>Docena: S./144</p>
          <p className = 'sample-prices'>Caja: S./1250</p>
        </div>
        <MuiThemeProvider>
          <Table onCellClick = { () => this.props.showDetailProduct(true) }>
            <TableBody
              displayRowCheckbox = { false }
            >
              
              {
                this.props.productsFiltered.map(product => {
                  return (
                    <TableRow key = { product._id } >
                      <TableRowColumn>{ product.picture }</TableRowColumn>
                      <TableRowColumn>{ product.name }</TableRowColumn>
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
  console.log(state)
  return {
    products: state.products,
    productsFiltered: state.productsFiltered
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProducts() {
      dispatch(loadProducts())
    },
    showDetailProduct(state) {
      dispatch(showDetailProduct(state))
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