import axios from 'axios'

const GET_PRODUCTS_PATH = '/products'
let SERVER_PATH = ''

axios.defaults.headers.common['Authorization'] =
  'JWT ' + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)

switch (process.env.REACT_APP_ENV) {
  case 'production':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_PRODUCTION;
    break;
  case 'development':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_DEVELOPMENT;
    break;
  default:
    break;
}

const activateStateLoader = () => {
  return ({
    type: 'ACTIVATE_STATE_LOADER'
  })
}

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

const changePriceProductFor = measurePrice => {
  return ({
    type: 'CHANGE_PRICE_PRODUCT_FOR',
    measurePrice
  })
}

const changeDiscountMeasureFor = measurePrice => {
  return ({
    type: 'CHANGE_DISCOUNT_MEASURE_FOR',
    measurePriceDiscount: measurePrice
  })
}

const loadProducts = () => {

  return dispatch => {
    return axios.get(SERVER_PATH + GET_PRODUCTS_PATH)
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

const modifyProductInSale = (productToModify) => {
  return ({
    type: 'MODIFY_PRODUCT_IN_SALE',
    productToModify
  })
}

const showDetailProduct = (selectedProduct, className, option, index) => {
  return ({
    type: 'SHOW_DETAIL_PRODUCT',
    selectedProduct: selectedProduct,
    className,
    optionFlag: option,
    indexFlag: index
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
  activateStateLoader,
  calculateSaleProduct,
  calculateSaleProductAlone,
  changePriceProductFor,
  changeDiscountMeasureFor,
  filterProducts,
  hideDetailProduct,
  loadProducts,
  modifyProductInSale,
  saveUnitChosen,
  saveUnitChosenFor,
  saveDiscountChosenFor,
  showDetailProduct
}