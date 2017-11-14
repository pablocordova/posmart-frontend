const addProductToSale = (productSelected) => {
  return ({
    type: 'ADD_PRODUCT_TO_SALE',
    productSelected
  })
}

export { addProductToSale }