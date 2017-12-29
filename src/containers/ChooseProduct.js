import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

import DetailProduct from './DetailProduct'
import {
  activateStateLoader,
  filterProducts,
  loadProducts,
  showDetailProduct
} from '../actions/products'

import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { green500, indigo500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ActionCached from 'material-ui/svg-icons/action/cached';

// Styles

const nameProductStyle = {
  fontFamily: 'Times, "Times New Roman", serif'
}

const separatorPricesStyle = {
  margin: '15px auto'
}

const heightTableStyle = {
  height: '500px',
  overflow: 'scroll'
}

const underlineStyle =  {
  borderColor: green500
}

const floatingLabelStyle = {
  color: indigo500
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
      <MuiThemeProvider>
        <div>
          <TextField
            hintText = 'Descripcion del producto'
            floatingLabelText = 'FILTRAR PRODUCTO'
            underlineFocusStyle = { underlineStyle }
            floatingLabelStyle = { floatingLabelStyle }
            value = { this.state.textProduct }
            onChange = { e => this.filterProductss(e) }
          />
          <IconButton
            tooltip = 'Actualizar productos'
            onClick = { () => {
              this.props.activateStateLoader()
              this.props.loadProducts()
            }}
          >
            <ActionCached />
          </IconButton>
          <OverlayLoader
            color = { 'green' }
            loader = 'ScaleLoader'
            text = 'Cargando...'
            active = { this.props.stateLoader }
            backgroundColor = {'black'}
            opacity = '.4'
          >
            <div style = { heightTableStyle }>
              <Table>
                <tbody className = 'row-table-selected'>
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
          </OverlayLoader>
          <DetailProduct/>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    productsFiltered: state.products.productsFiltered,
    stateLoader: state.products.stateLoader
  }
}

const mapDispatchToProps = dispatch => {
  return {
    activateStateLoader() {
      dispatch(activateStateLoader())
    },
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