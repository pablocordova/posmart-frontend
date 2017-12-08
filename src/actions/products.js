import axios from 'axios'

const GET_PRODUCTS_PATH = '/products'

const calculateSaleProduct = (
  amount,
  price,
  priceFor,
  discountMeasure,
  discount,
  discountGeneral
) => {
  return ({
    type: 'CALCULATE_SALE_PRODUCT',
    amount,
    price,
    priceFor,
    discountMeasure,
    discount,
    discountGeneral
  })
}

const calculateSaleProductAlone = (
  amount,
  price,
  priceFor,
  discountMeasure,
  discount,
  discountGeneral
) => {
  return ({
    type: 'CALCULATE_SALE_PRODUCT_ALONE',
    amount,
    price,
    priceFor,
    discountMeasure,
    discount,
    discountGeneral
  })
}

const changePriceProductFor = (measurePrice) => {
  return ({
    type: 'CHANGE_PRICE_PRODUCT_FOR',
    measurePrice
  })
}

const loadProducts = () => {

  return dispatch => {
    return axios.get(
      process.env.REACT_APP_SERVER_PATH + GET_PRODUCTS_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'LOAD_PRODUCTS',
          products: response.data.result,
        })
      })
  }

}

const filterProducts = (string) => {
  return ({
    type: 'FILTER_PRODUCTS',
    string: string
  })
}

const showDetailProduct = (state, selectedProduct) => {
  return ({
    type: 'SHOW_DETAIL_PRODUCT',
    modal: state,
    selectedProduct: selectedProduct
  })
}

const hideDetailProduct = () => {
  return ({
    type: 'HIDE_DETAIL_PRODUCT',
    modal: false
  })
}

const saveUnitChosen = (unitChosen, indexChosen) => {
  return ({
    type: 'SAVE_UNIT_CHOSEN',
    unitChosen,
    indexChosen
  })
}

const saveUnitChosenFor = (indexChosenFor) => {
  return ({
    type: 'SAVE_UNIT_CHOSEN_FOR',
    indexChosenFor
  })
}

const saveDiscountChosenFor = (indexDiscountFor) => {
  return ({
    type: 'SAVE_DISCOUNT_CHOSEN_FOR',
    indexDiscountFor
  })
}


export {
  calculateSaleProduct,
  calculateSaleProductAlone,
  changePriceProductFor,
  filterProducts,
  hideDetailProduct,
  loadProducts,
  saveUnitChosen,
  saveUnitChosenFor,
  saveDiscountChosenFor,
  showDetailProduct
}