const sale = ( state = { productsSale: [] }, action) => {

  switch (action.type) {
    case 'ADD_PRODUCT_TO_SALE':
      return {
        ...state,
        productsSale: state.productsSale.concat(action.productSelected)
      }
    default:
      return state
  }

}

export default sale