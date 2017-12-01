import axios from 'axios'

const SALE_PATH = '/sales'
const PRINT_PATH = '/print'

const addProductToSale = (
  selectedProduct,
  amountProduct,
  unitChosen,
  indexChosen,
  priceUnitWithDiscount,
  totalProduct
) => {
  return ({
    type: 'ADD_PRODUCT_TO_SALE',
    selectedProduct,
    amountProduct,
    unitChosen,
    indexChosen,
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

const saveSale = (productsSale, clientID) => {

  return () => {
    return axios.post(
      process.env.REACT_APP_SERVER_PATH + SALE_PATH,
      {
        client: clientID,
        products: productsSale
      },
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

}

const saveAndPrintSale = (productsSale, clientID) => {

  return () => {
    return axios.post(process.env.REACT_APP_SERVER_PATH + SALE_PATH, {
      client: clientID,
      products: productsSale
    })
      .then(response => {
        console.log(response)
        // I need to pass id of sale to print
        // PRINT
        /*
        axios.post(process.env.REACT_APP_SERVER_PATH + PRINT_PATH, {
          productsSale: productsSale
        })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
        */
      })
      .catch(error => {
        console.log(error)
      })
  }

}

export {
  addProductToSale,
  deleteProductInSale,
  saveSale,
  saveAndPrintSale
}