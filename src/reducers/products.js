const products = (
  state = {
    products: [],
    modal: false,
    productsFiltered: [],
    amountProduct: '1',
    priceProduct: '',
    totalProduct: '',
    selectedProduct: {
      prices: []
    }
  },
  action
) => {

  switch (action.type) {
    case 'CALCULATE_SALE_PRODUCT':
    {
      const total = parseFloat(action.amount) * parseFloat(action.price)
      return {
        ...state,
        totalProduct: total,
        amountProduct: action.amount,
        priceProduct: action.price
      }
    }
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        products: action.products,
        productsFiltered: action.products
      }
    case 'SHOW_DETAIL_PRODUCT':
      console.log('show detail product')
      console.log(action.selectedProduct)
      return {
        ...state,
        modal: action.modal,
        selectedProduct: action.selectedProduct,
        priceProduct: action.selectedProduct.prices[0].price,
        totalProduct: parseFloat(action.selectedProduct.prices[0].price)
      }
    case 'FILTER_PRODUCTS':
      return {
        ...state,
        productsFiltered: state.products.filter(e =>{
          return e.name.toLowerCase().indexOf(action.string.toLowerCase()) !== -1
        })
      }
    case 'HIDE_DETAIL_PRODUCT':
      return {
        ...state,
        modal: action.modal
      }
    default:
      return state
  }

}

export default products