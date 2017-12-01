import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { hideDetailProduct, calculateSaleProduct, saveUnitChosen } from '../actions/products'
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
                    this.props.calculateSaleProduct(
                      e.target.value,
                      this.props.priceProduct,
                      this.props.discountProduct
                    )
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Medida</ControlLabel>
                <FormControl
                  componentClass = 'select'
                  onChange = { e => {
                    this.props.calculateSaleProduct(
                      this.props.amountProduct,
                      e.target.value,
                      this.props.discountProduct
                    )
                    this.props.saveUnitChosen(
                      e.target.selectedOptions[0].innerText,
                      e.target.selectedOptions[0].index
                    )
                  }}
                >
                  {
                    this.props.selectedProduct.prices.map(price => {
                      return (
                        <option
                          value = { price.price }
                          key = { price.name }
                        >
                          { price.name }
                        </option>
                      )
                    })
                  }
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Descuento unitario</ControlLabel>
                <FormControl
                  type = 'number'
                  defaultValue = { 0 }
                  onChange = { (e) =>
                    this.props.calculateSaleProduct(
                      this.props.amountProduct,
                      this.props.priceProduct,
                      e.target.value
                    )
                  }
                />
              </FormGroup>
              <FormGroup className = 'rightText'>
                <ControlLabel>Total</ControlLabel>
                <ControlLabel>S./{ this.props.totalProduct }</ControlLabel>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick = { () => this.props.hideDetailProduct() }>Cancelar</Button>
            <Button bsStyle = 'primary' onClick = { () => {
              this.props.addProductToSale(
                this.props.selectedProduct,
                this.props.amountProduct,
                this.props.unitChosen,
                this.props.indexChosen,
                this.props.priceProduct - this.props.discountProduct,
                this.props.totalProduct
              )
              this.props.hideDetailProduct()
            }}
            >OK</Button>
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
    unitChosen: state.products.unitChosen,
    indexChosen: state.products.indexChosen,
    priceProduct: state.products.priceProduct,
    discountProduct: state.products.discountProduct,
    totalProduct: state.products.totalProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideDetailProduct() {
      dispatch(hideDetailProduct())
    },
    addProductToSale(
      selectedProduct,
      amountProduct,
      unitChosen,
      indexChosen,
      priceUnitWithDiscount,
      totalProduct
    ) {
      dispatch(addProductToSale(
        selectedProduct,
        amountProduct,
        unitChosen,
        indexChosen,
        priceUnitWithDiscount,
        totalProduct
      ))
    },
    calculateSaleProduct(amount, price, discount) {
      dispatch(calculateSaleProduct(amount, price, discount))
    },
    saveUnitChosen(unitChosen, indexChosen) {
      dispatch(saveUnitChosen(unitChosen, indexChosen))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailProduct)