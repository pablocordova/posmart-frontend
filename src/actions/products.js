import axios from 'axios'

const GET_PRODUCTS_PATH = '/products'

const calculateSaleProduct = (amount, price, discount) => {
  return ({
    type: 'CALCULATE_SALE_PRODUCT',
    amount,
    price,
    discount
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

const saveUnitChosen = (unitChosen) => {
  return ({
    type: 'SAVE_UNIT_CHOSEN',
    unitChosen
  })
}

export {
  calculateSaleProduct,
  filterProducts,
  hideDetailProduct,
  loadProducts,
  saveUnitChosen,
  showDetailProduct
}