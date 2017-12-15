import _ from 'lodash'

const products = (
  state = {
    discountMeasureProduct: '',
    discountProduct: '',
    discountGeneralProduct: '',
    products: [],
    modal: false,
    productsFiltered: [],
    amountProduct: '1',
    priceProduct: '',
    priceProductFor: '',
    totalProduct: '',
    selectedProduct: {
      name: '',
      prices: []
    },
    unitChosen: '',
    indexChosen: 0,
    unitsInPrice: 1,
    indexChosenFor: 0,
    indexDiscountFor: 0
  },
  action
) => {

  switch (action.type) {
    case 'CALCULATE_SALE_PRODUCT':
    {
      //let total = parseFloat(action.amount) * parseFloat(action.price) -
      //  parseFloat(action.amount) * parseFloat(action.discount)
      const itemsPriceFor = state.selectedProduct.prices[state.indexChosenFor].items
      const itemsPrice = state.selectedProduct.prices[state.indexChosen].items
      let total = (action.priceFor * action.amount * itemsPrice) / itemsPriceFor

      // Discount for
      const itemsDiscountFor = state.selectedProduct.prices[state.indexDiscountFor].items
      console.log(itemsDiscountFor)
      console.log(action.amount)
      console.log(itemsPrice)
      console.log(action.discount)
      const discountFor = (action.amount * itemsPrice * action.discount) / itemsDiscountFor
      console.log(discountFor)
      total = total - discountFor
      // Discount general
      total = total - parseFloat(action.discountGeneral)

      total = _.round(total, 1)
      return {
        ...state,
        totalProduct: total,
        amountProduct: action.amount,
        priceProduct: action.price,
        //priceProductFor: action.priceFor,
        //discountMeasureProduct: action.discountMeasure,
        discountProduct: action.discount,
        discountGeneralProduct: action.discountGeneral
      }
    }
    case 'CALCULATE_SALE_PRODUCT_ALONE':
    {
      let total = parseFloat(action.amount) * parseFloat(action.price)

      total = total - parseFloat(action.discountGeneral)
      total = _.round(total, 1)
      return {
        ...state,
        totalProduct: total
      }
    }
    case 'CHANGE_PRICE_PRODUCT_FOR':
    {
      // TODO last case already save this data
      return {
        ...state,
        priceProductFor: action.measurePrice
      }
    }
    case 'CHANGE_DISCOUNT_MEASURE_FOR':
    {
      return {
        ...state,
        discountMeasureProduct: action.measurePriceDiscount
      }
    }
    case 'LOAD_PRODUCTS': {
      let productsWithPrices = action.products.filter(product => {
        return product.prices.length > 0
      })
      return {
        ...state,
        products: productsWithPrices,
        productsFiltered: productsWithPrices
      }
    }
    case 'SHOW_DETAIL_PRODUCT':
      return {
        ...state,
        amountProduct: '1',
        modal: action.modal,
        selectedProduct: action.selectedProduct,
        priceProduct: action.selectedProduct.prices[0].price,
        priceProductFor: action.selectedProduct.prices[0].price,
        totalProduct: parseFloat(action.selectedProduct.prices[0].price),
        discountMeasureProduct: action.selectedProduct.prices[0].price,
        discountProduct: 0,
        discountGeneralProduct: 0,
        unitChosen: action.selectedProduct.prices[0].name,
        indexChosen: 0,
        indexChosenFor: 0,
        indexDiscountFor: 0,
        unitsInPrice: action.selectedProduct.prices[0].items
      }
    case 'FILTER_PRODUCTS': {
      let productsCopy = state.products
      let wordsToSearch = action.string.toLowerCase().split(' ')
      for (let word of wordsToSearch) {
        productsCopy = productsCopy.filter(e =>{
          return e.name.toLowerCase().indexOf(word) !== -1
        })
      }
      return {
        ...state,
        productsFiltered: productsCopy
      }
    }
    case 'HIDE_DETAIL_PRODUCT':
      return {
        ...state,
        modal: action.modal
      }
    case 'SAVE_UNIT_CHOSEN':
      return {
        ...state,
        unitChosen: action.unitChosen,
        indexChosen: action.indexChosen,
        unitsInPrice: state.selectedProduct.prices[action.indexChosen].items,
        indexChosenFor: action.indexChosen
      }
    case 'SAVE_UNIT_CHOSEN_FOR':
      return {
        ...state,
        indexChosenFor: action.indexChosenFor
      }
    case 'SAVE_DISCOUNT_CHOSEN_FOR':
      return {
        ...state,
        indexDiscountFor: action.indexDiscountFor
      }
    default:
      return state
  }

}

export default products