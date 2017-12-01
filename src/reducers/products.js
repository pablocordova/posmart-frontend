import _ from 'lodash'

const products = (
  state = {
    products: [],
    modal: false,
    productsFiltered: [],
    amountProduct: '1',
    priceProduct: '',
    totalProduct: '',
    discountProduct: '',
    selectedProduct: {
      prices: []
    },
    unitChosen: '',
    indexChosen: 0
  },
  action
) => {

  switch (action.type) {
    case 'CALCULATE_SALE_PRODUCT':
    {
      let total = parseFloat(action.amount) * parseFloat(action.price) -
        parseFloat(action.amount) * parseFloat(action.discount)
      total = _.round(total, 1)
      return {
        ...state,
        totalProduct: total,
        amountProduct: action.amount,
        priceProduct: action.price,
        discountProduct: action.discount
      }
    }
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        products: action.products,
        productsFiltered: action.products
      }
    case 'SHOW_DETAIL_PRODUCT':
      return {
        ...state,
        amountProduct: '1',
        modal: action.modal,
        selectedProduct: action.selectedProduct,
        priceProduct: action.selectedProduct.prices[0].price,
        totalProduct: parseFloat(action.selectedProduct.prices[0].price),
        discountProduct: 0,
        unitChosen: action.selectedProduct.prices[0].name,
        indexChosen: 0
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
    case 'SAVE_UNIT_CHOSEN':
      console.log('saving unit chosen')
      console.log(action.unitChosen)
      return {
        ...state,
        unitChosen: action.unitChosen,
        indexChosen: action.indexChosen
      }
    default:
      return state
  }

}

export default products