import axios from 'axios'

const SALE_PATH = '/sales'
const SETTINGS_PATH = '/settings'
const PRINT_PATH = '/print/sale'
const PROCESSED_SALES_PATH = '/processed'

let SERVER_PATH = ''

switch (process.env.REACT_APP_ENV) {
  case 'production':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_PRODUCTION;
    break;
  case 'development':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_DEVELOPMENT;
    break;
  default:
    break;
}

const addProductToSale = (
  selectedProduct,
  amountProduct,
  unitChosen,
  indexChosen,
  priceUnit,
  totalProduct,
  unitsInPrice,
  discountsOptions,
  modifyProduct
) => {
  return ({
    type: 'ADD_PRODUCT_TO_SALE',
    selectedProduct,
    amountProduct,
    unitChosen,
    indexChosen,
    priceUnit,
    totalProduct,
    unitsInPrice,
    discountsOptions,
    modifyProduct
  })
}

const clearDataSale = () => {
  return ({
    type: 'CLEAR_DATA_SALE'
  })
}

const copyReceiptToSale = (idReceipt) => {

  return dispatch => {
    return axios.get(
      SERVER_PATH + SALE_PATH + PROCESSED_SALES_PATH + '/' + idReceipt,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'COPY_RECEIPT_TO_SALE',
          saleSelected: response.data.result,
        })
      })
  }

}

const deleteProductInSale = (indexProductInSale) => {
  return ({
    type: 'DELETE_PRODUCT_IN_SALE',
    indexProductInSale
  })
}

const saveSale = (productsSale, clientID, state) => {

  return () => {
    return axios.post(
      SERVER_PATH + SALE_PATH,
      {
        state: state,
        client: clientID,
        products: productsSale
      },
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
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

const saveAndPrintSale = (productsSale, clientID, state) => {

  return () => {
    return axios.post(
      SERVER_PATH + SALE_PATH,
      {
        state: state,
        client: clientID,
        products: productsSale
      },
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
        }
      }
    )
      .then(response => {
        console.log(response)
        // I need to pass id of sale to print
        // PRINT
        axios.post(
          SERVER_PATH + SETTINGS_PATH + PRINT_PATH,
          {
            saleID: response.data.result._id
          },
          {
            headers: {
              'Authorization': 'JWT ' + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            }
          }
        )
          .then(res => {
            console.log(res)
          })
          .catch(err=> {
            console.log(err)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

}

const updateStateSale = (stateSale) => {
  return ({
    type: 'UPDATE_STATE_SALE',
    stateSale
  })
}

export {
  addProductToSale,
  clearDataSale,
  copyReceiptToSale,
  deleteProductInSale,
  saveSale,
  saveAndPrintSale,
  updateStateSale
}