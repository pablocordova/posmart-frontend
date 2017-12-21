import _ from 'lodash'

const sale = ( state = {
  productsSale: [],
  totalSale: 0,
  disabledButton: true
}, action) => {

  switch (action.type) {
    case 'CLEAR_DATA_SALE':
      return {
        ...state,
        productsSale: [],
        totalSale: 0,
        disabledButton: true
      }
    case 'COPY_RECEIPT_TO_SALE': {

      let sale = action.saleSelected;
      let products = []

      for (let product of sale.products) {
        // Generate
        //const items = product.prices[product.indexPrice].items;
        const items = product.unitsInPrice
        const objProductSale = {
          product: product.id,
          name: product.name,
          quantity: parseFloat(product.quantity),
          unit: product.measure,
          priceIndex: product.indexPrice,
          price: _.round(product.total / (items * parseFloat(product.quantity)), 2),
          total: product.total,
          unitsInPrice: items
        }
        products.push(objProductSale);
      }
      return {
        ...state,
        productsSale: products,
        totalSale: sale.total,
        disabledButton: false
      }
    }
    case 'ADD_PRODUCT_TO_SALE': {
      const objProductSale = {
        product: action.selectedProduct._id,
        name: action.selectedProduct.name,
        quantity: action.amountProduct,
        unit: action.unitChosen,
        priceIndex: action.indexChosen,
        price: _.round(action.priceUnitWithDiscount, 2),
        total: _.round(action.totalProduct, 2),
        unitsInPrice: action.unitsInPrice
      }
      return {
        ...state,
        productsSale: state.productsSale.concat(objProductSale),
        totalSale: _.round(state.totalSale + action.totalProduct, 2),
        disabledButton: false
      }
    }
    case 'DELETE_PRODUCT_IN_SALE': {
      let disabled = false
      if (state.productsSale.length === 1) {
        disabled = true
      }
      return {
        ...state,
        totalSale: state.totalSale - state.productsSale[action.indexProductInSale].total,
        productsSale: state.productsSale.filter((productSale, index) =>
          index !== parseInt(action.indexProductInSale, 10)
        ),
        disabledButton: disabled
      }
    }
    default:
      return state
  }

}

export default sale