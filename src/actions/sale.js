const addProductToSale = (
  selectedProduct,
  amountProduct,
  unitChosen,
  priceUnitWithDiscount,
  totalProduct
) => {
  return ({
    type: 'ADD_PRODUCT_TO_SALE',
    selectedProduct,
    amountProduct,
    unitChosen,
    priceUnitWithDiscount,
    totalProduct
  })
}

const deleteProductInSale = (indexProductInSale) => {
  return ({
    type: 'DELETE_PRODUCT_IN_SALE',
    indexProductInSale
  })
}

const saveSale = (productsSale) => {
  return ({
    type: 'SAVE_SALE',
    productsSale
  })
}

const saveAndPrintSale = (productsSale) => {
  return ({
    type: 'SAVE_AND_PRINT_SALE',
    productsSale
  })
}

export {
  addProductToSale,
  deleteProductInSale,
  saveSale,
  saveAndPrintSale
}