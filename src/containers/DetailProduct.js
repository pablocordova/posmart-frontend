import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import {
  calculateSaleProduct,
  calculateSaleProductAlone,
  hideDetailProduct,
  changePriceProductFor,
  changeDiscountMeasureFor,
  saveUnitChosen,
  saveUnitChosenFor,
  saveDiscountChosenFor
} from '../actions/products'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { addProductToSale } from '../actions/sale'

// Styles

const separatorPricesStyle = {
  margin: '15px auto'
}

const formsReducedStyle = {
  width: '25%',
  marginLeft: '20px',
  display: 'inline-block'
}

class DetailProduct extends Component {

  render() {
    return (
      <div>
        <Modal show = { this.props.modal } >
          <Modal.Header className = 'text-center'>
            <Modal.Title> { this.props.selectedProduct.name.toUpperCase() } </Modal.Title>
            <div style = { separatorPricesStyle }>
              {
                this.props.selectedProduct.prices.map((entry, index) => {
                  return (
                    <div className = 'flag-price-samples' key = { index }>
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
                      this.props.priceProductFor,
                      this.props.discountMeasureProduct,
                      this.props.discountProduct,
                      this.props.discountGeneralProduct
                    )
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Medida</ControlLabel>
                <FormControl
                  componentClass = 'select'
                  onChange = { e => {
                    this.props.saveUnitChosen(
                      e.target.selectedOptions[0].innerText,
                      e.target.selectedOptions[0].index
                    )
                    this.props.changePriceProductFor(e.target.value)
                    this.props.changeDiscountMeasureFor(e.target.value)
                    this.props.calculateSaleProductAlone(
                      this.props.amountProduct,
                      e.target.value,
                      this.props.priceProductFor,
                      this.props.discountMeasureProduct,
                      this.props.discountProduct,
                      this.props.discountGeneralProduct
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
              <hr />
              <h4>DESCUENTOS</h4>
              <FormGroup>
                <ControlLabel>Precio por</ControlLabel>
                <FormControl
                  style = { formsReducedStyle }
                  componentClass = 'select'
                  value = { this.props.priceProductFor }
                  onChange = { e => {
                    this.props.changePriceProductFor(e.target.value)
                    this.props.saveUnitChosenFor(
                      e.target.selectedOptions[0].index
                    )
                    this.props.calculateSaleProduct(
                      this.props.amountProduct,
                      this.props.priceProduct,
                      e.target.value,
                      this.props.discountMeasureProduct,
                      this.props.discountProduct,
                      this.props.discountGeneralProduct
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
                <ControlLabel>Descuento por</ControlLabel>
                <FormControl
                  style = { formsReducedStyle }
                  value = { this.props.discountMeasureProduct }
                  componentClass = 'select'
                  onChange = { e => {
                    this.props.changeDiscountMeasureFor(e.target.value)
                    this.props.saveDiscountChosenFor(
                      e.target.selectedOptions[0].index
                    )
                    this.props.calculateSaleProduct(
                      this.props.amountProduct,
                      this.props.priceProduct,
                      this.props.priceProductFor,
                      e.target.value,
                      this.props.discountProduct,
                      this.props.discountGeneralProduct
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
                <FormControl
                  style = { formsReducedStyle }
                  type = 'number'
                  value = { this.props.discountProduct }
                  onChange = { (e) => {
                    this.props.calculateSaleProduct(
                      this.props.amountProduct,
                      this.props.priceProduct,
                      this.props.priceProductFor,
                      this.props.discountMeasureProduct,
                      e.target.value,
                      this.props.discountGeneralProduct
                    )
                  }}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Descuento General</ControlLabel>
                <FormControl
                  style = { formsReducedStyle }
                  type = 'number'
                  value = { this.props.discountGeneralProduct }
                  onChange = { (e) => {
                    this.props.calculateSaleProduct(
                      this.props.amountProduct,
                      this.props.priceProduct,
                      this.props.priceProductFor,
                      this.props.discountMeasureProduct,
                      this.props.discountProduct,
                      e.target.value
                    )
                  }}
                />
              </FormGroup>
              <FormGroup className = 'text-align-right'>
                <h2>Total S./{ this.props.totalProduct }</h2>
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
                this.props.totalProduct,
                this.props.unitsInPrice
              )
              this.props.hideDetailProduct()
            }}
            >ELEGIR</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    discountMeasureProduct: state.products.discountMeasureProduct,
    discountProduct: state.products.discountProduct,
    discountGeneralProduct: state.products.discountGeneralProduct,
    modal: state.products.modal,
    selectedProduct: state.products.selectedProduct,
    amountProduct: state.products.amountProduct,
    unitChosen: state.products.unitChosen,
    indexChosen: state.products.indexChosen,
    priceProduct: state.products.priceProduct,
    priceProductFor: state.products.priceProductFor,
    totalProduct: state.products.totalProduct,
    unitsInPrice: state.products.unitsInPrice
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
      totalProduct,
      unitsInPrice
    ) {
      dispatch(addProductToSale(
        selectedProduct,
        amountProduct,
        unitChosen,
        indexChosen,
        priceUnitWithDiscount,
        totalProduct,
        unitsInPrice
      ))
    },
    calculateSaleProduct(amount, price, priceFor, discountMeasure, discount, discountGeneral) {
      dispatch(calculateSaleProduct(
        amount,
        price,
        priceFor,
        discountMeasure,
        discount,
        discountGeneral)
      )
    },
    calculateSaleProductAlone(amount, price, priceFor, discountMeasure, discount, discountGeneral) {
      dispatch(calculateSaleProductAlone(
        amount,
        price,
        priceFor,
        discountMeasure,
        discount,
        discountGeneral)
      )
    },
    changePriceProductFor(measurePrice) {
      dispatch(changePriceProductFor(measurePrice))
    },
    changeDiscountMeasureFor(measurePrice) {
      dispatch(changeDiscountMeasureFor(measurePrice))
    },
    saveUnitChosen(unitChosen, indexChosen) {
      dispatch(saveUnitChosen(unitChosen, indexChosen))
    },
    saveUnitChosenFor(indexChosenFor) {
      dispatch(saveUnitChosenFor(indexChosenFor))
    },
    saveDiscountChosenFor(indexDiscountFor) {
      dispatch(saveDiscountChosenFor(indexDiscountFor))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailProduct)