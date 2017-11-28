import axios from 'axios'

const GET_PRODUCTS_PATH = '/products'

axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token')

const calculateSaleProduct = (amount, price) => {
  return ({
    type: 'CALCULATE_SALE_PRODUCT',
    amount,
    price
  })
}

const loadProducts = () => {

  return dispatch => {
    return axios.get(process.env.REACT_APP_SERVER_PATH + GET_PRODUCTS_PATH)
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

export { loadProducts, showDetailProduct, filterProducts, hideDetailProduct, calculateSaleProduct }