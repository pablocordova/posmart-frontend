import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
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

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { indigo500, green500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton'

import swal from 'sweetalert2'
// Styles

const separatorPricesStyle = {
  margin: '15px auto'
}

const formsReducedStyle = {
  width: '25%',
  marginLeft: '20px',
  display: 'inline-block',
  marginBottom: '0px'
}

const headerModalStyle = {
  textAlign: 'center',
  background: '#3F51B5',
  color: 'white',
  paddingBottom: '0px',
  paddingTop: '5px'
}

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    accent1Color: green500
  }
});

class DetailProduct extends Component {

  constructor() {
    super()
    this.state = {
      validation: {
        quantity: null,
        discountBy: null,
        discountGeneral: null
      },
      visibleWindowPIN: false,
      pinNumber: 0,
      validationPIN: null
    }
  }

  cleanValidations() {
    this.setState(prevState  => ({
      validation: {
        ...prevState.validation,
        quantity: null,
        discountBy: null,
        discountGeneral: null
      }
    }))
  }

  addProductToList() {

    let realCost = this.props.selectedProduct.unitCost * this.props.unitsInPrice
    let givenCost = this.props.totalProduct / this.props.amountProduct

    let addProductToSaleMethod = this.props.addProductToSale
    let hideDetailProductMethod = this.props.hideDetailProduct

    let selectedProduct = this.props.selectedProduct
    let amountProduct = this.props.amountProduct
    let unitChosen = this.props.unitChosen
    let indexChosen = this.props.indexChosen
    let totalPrice = this.props.priceProduct - this.props.discountProduct
    let totalProduct = this.props.totalProduct
    let unitsInPrice = this.props.unitsInPrice

    let discountsOptions = {
      priceProductFor: this.props.priceProductFor,
      discountMeasureProduct: this.props.discountMeasureProduct,
      discountProduct: this.props.discountProduct,
      discountGeneralProduct: this.props.discountGeneralProduct
    }

    let modifyProduct = this.props.modifyProduct

    if (givenCost < realCost) {
      swal({
        title: 'Tendrá cero o negativa ganancia en este producto',
        text: 'El costo por ' + this.props.unitChosen + ' es : S./' + realCost +
          ' y usted lo esta vendiendo a : S./' + givenCost,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vender',
        cancelButtonText: 'Cancelar'
      }).then(function (result) {
        if (result.value) {
          addProductToSaleMethod(
            selectedProduct,
            amountProduct,
            unitChosen,
            indexChosen,
            totalPrice,
            totalProduct,
            unitsInPrice,
            discountsOptions,
            modifyProduct
          )
          hideDetailProductMethod()
        }
      })
    } else {
      this.props.addProductToSale(
        this.props.selectedProduct,
        this.props.amountProduct,
        this.props.unitChosen,
        this.props.indexChosen,
        this.props.priceProduct,
        this.props.totalProduct,
        this.props.unitsInPrice,
        discountsOptions,
        modifyProduct
      )
      this.props.hideDetailProduct()
    }

  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <Modal show = { this.props.modal } >
            <Modal.Header style = { headerModalStyle}>
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
                <FormGroup validationState = { this.state.validation.quantity }>
                  <ControlLabel>Cantidad</ControlLabel>
                  <FormControl
                    type = 'number'
                    value = { this.props.amountProduct }
                    onChange = { e => {
                      // Validation
                      let stateQuantity = null
                      if (e.target.value <= 0) {
                        stateQuantity = 'error'
                      }
                      this.setState(prevState  => ({
                        validation: {
                          ...prevState.validation,
                          quantity: stateQuantity
                        }
                      }))
                      // Functions
                      this.props.calculateSaleProduct(
                        e.target.value,
                        this.props.priceProduct,
                        this.props.priceProductFor,
                        this.props.discountMeasureProduct,
                        this.props.discountProduct,
                        this.props.discountGeneralProduct
                      )
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Medida</ControlLabel>
                  <FormControl
                    componentClass = 'select'
                    value = { this.props.priceProduct }
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
                <div hidden = { localStorage.getItem('permissionDiscount') === 'NoPermit'}>
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
                    <FormGroup
                      validationState = { this.state.validation.discountBy }
                      style = { formsReducedStyle }
                    >
                      <FormControl
                        type = 'number'
                        value = { this.props.discountProduct }
                        onChange = { (e) => {
                          // Validations
                          let stateDiscountBy = null
                          if (e.target.value < 0) {
                            stateDiscountBy = 'error'
                          }
                          this.setState(prevState  => ({
                            validation: {
                              ...prevState.validation,
                              discountBy: stateDiscountBy
                            }
                          }))
                          // Functions
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
                  </FormGroup>
                  <FormGroup validationState = { this.state.validation.discountGeneral }>
                    <ControlLabel>Descuento General</ControlLabel>
                    <FormControl
                      type = 'number'
                      value = { this.props.discountGeneralProduct }
                      style = { formsReducedStyle }
                      onChange = { (e) => {
                        // Validations
                        let stateDiscountGeneral = null
                        if (e.target.value < 0) {
                          stateDiscountGeneral = 'error'
                        }
                        this.setState(prevState  => ({
                          validation: {
                            ...prevState.validation,
                            discountGeneral: stateDiscountGeneral
                          }
                        }))
                        // Functions
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
                </div>
                <FormGroup className = 'text-align-right'>
                  <h2>Total S./{ this.props.totalProduct }</h2>
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <RaisedButton
                label = 'CANCELAR'
                onClick = { () => {
                  this.props.hideDetailProduct()
                  this.cleanValidations()
                }}
              />
              <RaisedButton
                label = 'ELEGIR'
                secondary = { true }
                onClick = { () => {
                  const quantity = this.state.validation.quantity
                  const disBy = this.state.validation.discountBy
                  const disGeneral = this.state.validation.discountGeneral
                  // Only if there are not error in forms
                  if (quantity !== 'error' && disBy !== 'error' && disGeneral !== 'error') {

                    // Case user have permission by pin
                    if (localStorage.getItem('permissionDiscount') === 'PermitPIN' &&
                      (
                        parseInt(this.props.discountGeneralProduct, 10) !== 0 ||
                        parseInt(this.props.discountProduct, 10) !== 0
                      )
                    ) {
                      this.setState({
                        visibleWindowPIN: true
                      })
                    } else {
                      this.addProductToList()
                    }
                  }
                }}
              />
            </Modal.Footer>
          </Modal>
          <Modal show = { this.state.visibleWindowPIN }>
            <Modal.Header style = { headerModalStyle}>
              <Modal.Title> PIN de seguridad </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Ha realizado un descuento, por lo cual requiere permiso,
              inserte PIN de seguridad</p>
              <FormGroup validationState = { this.state.validationPIN }>
                <FormControl
                  type = 'number'
                  onChange = { e =>
                    this.setState({
                      pinNumber: e.target.value
                    })
                  }
                />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <RaisedButton
                label = 'CANCELAR'
                onClick = { () => {
                  this.setState({
                    visibleWindowPIN: false
                  })
                }}
              />
              <RaisedButton
                label = 'ACEPTAR'
                primary = { true}
                onClick = { () => {
                  if (this.state.pinNumber === localStorage.getItem('permissionPin')) {
                    this.setState({
                      visibleWindowPIN: false
                    })
                    this.addProductToList()
                  } else {
                    this.setState({
                      validationPIN: 'error'
                    })
                  }
                }}
              />
            </Modal.Footer>
          </Modal>
        </div>
      </MuiThemeProvider>
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
    unitsInPrice: state.products.unitsInPrice,
    modifyProduct: state.products.modifyProduct
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
      priceUnit,
      totalProduct,
      unitsInPrice,
      discountsOptions,
      modifyProduct
    ) {
      dispatch(addProductToSale(
        selectedProduct,
        amountProduct,
        unitChosen,
        indexChosen,
        priceUnit,
        totalProduct,
        unitsInPrice,
        discountsOptions,
        modifyProduct
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