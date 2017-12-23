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
    indexDiscountFor: 0,
    stateLoader: true
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
      const discountFor = (action.amount * itemsPrice * action.discount) / itemsDiscountFor
      total = total - discountFor
      // Discount general
      total = total - parseFloat(action.discountGeneral)

      total = _.round(total, 2)
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
      total = _.round(total, 2)
      return {
        ...state,
        totalProduct: total,
        priceProduct: action.price
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
        productsFiltered: productsWithPrices,
        stateLoader: false
      }
    }
    case 'SHOW_DETAIL_PRODUCT': {
      let firstMeasure = action.selectedProduct.prices[0].price
      if (action.className === 'flag-price-samples') {
        firstMeasure = action.optionFlag
      }
      return {
        ...state,
        amountProduct: '1',
        modal: true,
        selectedProduct: action.selectedProduct,
        priceProduct: firstMeasure,
        priceProductFor: firstMeasure,
        totalProduct: parseFloat(firstMeasure),
        discountMeasureProduct: firstMeasure,
        discountProduct: 0,
        discountGeneralProduct: 0,
        unitChosen: action.selectedProduct.prices[action.indexFlag].name,
        indexChosen: action.indexFlag,
        indexChosenFor: action.indexFlag,
        indexDiscountFor: action.indexFlag,
        unitsInPrice: action.selectedProduct.prices[action.indexFlag].items
      }
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
        indexChosenFor: action.indexChosen,
        indexDiscountFor: action.indexChosen,
        discountProduct: 0,
        discountGeneralProduct: 0
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