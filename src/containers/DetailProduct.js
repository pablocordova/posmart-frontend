import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { hideDetailProduct, calculateSaleProduct } from '../actions/products'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { addProductToSale } from '../actions/sale'

import './styles.css'

class DetailProduct extends Component {

  render() {
    return (
      <div>
        <Modal show = { this.props.modal } >
          <Modal.Header>
            <Modal.Title> { this.props.selectedProduct.name } </Modal.Title>
            <div className = 'block-sample-prices'>
              {
                this.props.selectedProduct.prices.map((entry, index) => {
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
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Cantidad</ControlLabel>
                <FormControl
                  type = 'number'
                  defaultValue = { 1 }
                  onChange = { (e) =>
                    this.props.calculateSaleProduct(e.target.value, this.props.priceProduct)
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Medida</ControlLabel>
                <FormControl
                  componentClass = 'select'
                  onChange = { e =>
                    this.props.calculateSaleProduct(this.props.amountProduct, e.target.value)
                  }
                >
                  {
                    this.props.selectedProduct.prices.map(price => {
                      return (
                        <option value = { price.price } key = { price.name }>{ price.name }</option>
                      )
                    })
                  }
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Descuento</ControlLabel>
                <FormControl
                  type = 'number'
                />
              </FormGroup>
              <FormGroup className = 'rightText'>
                <ControlLabel>Total</ControlLabel>
                <ControlLabel>S./{this.props.totalProduct}</ControlLabel>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick = { () => this.props.hideDetailProduct() }>Cancelar</Button>
            <Button bsStyle = 'primary' onClick = { () =>
              this.props.addProductToSale(this.props.selectedProduct)
            }>OK</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    modal: state.products.modal,
    selectedProduct: state.products.selectedProduct,
    amountProduct: state.products.amountProduct,
    priceProduct: state.products.priceProduct,
    totalProduct: state.products.totalProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideDetailProduct() {
      dispatch(hideDetailProduct())
    },
    addProductToSale(selectedProduct) {
      dispatch(addProductToSale(selectedProduct))
    },
    calculateSaleProduct(amount, price) {
      dispatch(calculateSaleProduct(amount, price))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailProduct)