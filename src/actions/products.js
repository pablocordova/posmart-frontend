import axios from 'axios'

const SERVER_PATH = 'http://192.168.5.6:3000/'
const GET_PRODUCTS_PATH = 'products'

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

const showDetailProduct = (state, selectedProduct) => {
  return ({
    type: 'SHOW_DETAIL_PRODUCT',
    modal: state,
    selectedProduct: selectedProduct
  })
}

export { loadProducts, showDetailProduct, filterProducts }