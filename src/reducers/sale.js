const sale = ( state = {
  productsSale: [],
  totalSale: 0
}, action) => {

  switch (action.type) {
    case 'ADD_PRODUCT_TO_SALE': {
      const objProductSale = {
        product: action.selectedProduct._id,
        name: action.selectedProduct.name,
        quantity: action.amountProduct,
        unit: action.unitChosen,
        priceIndex: action.indexChosen,
        price: action.priceUnitWithDiscount,
        total: action.totalProduct
      }
      return {
        ...state,
        productsSale: state.productsSale.concat(objProductSale),
        totalSale: state.totalSale + action.totalProduct
      }
    }
    case 'DELETE_PRODUCT_IN_SALE': {
      return {
        ...state,
        totalSale: state.totalSale - state.productsSale[action.indexProductInSale].total,
        productsSale: state.productsSale.filter((productSale, index) =>
          index !== parseInt(action.indexProductInSale, 10)
        )
      }
    }
    default:
      return state
  }

}

export default sale