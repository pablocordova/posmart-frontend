import axios from 'axios'

const SALES_PATH = '/sales'
const SETTINGS_PATH = '/settings'
const LAST_SALES_PATH = '/last/10'
const BYID_SALES_PATH = '/bypartialid'
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

const hideCompleteReceipt = () => {
  return ({
    type: 'HIDE_COMPLETE_RECEIPT'
  })
}

const getLastReceipts = () => {

  return dispatch => {
    return axios.get(
      SERVER_PATH + SALES_PATH + LAST_SALES_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'LOAD_RECEIPT',
          receipt: response.data.result,
        })
      })
  }

}

const getReceiptById = (idReceipt) => {

  return dispatch => {
    return axios.get(
      SERVER_PATH + SALES_PATH + BYID_SALES_PATH + '/' + idReceipt,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'LOAD_RECEIPT_ONE',
          receipt: response.data.result,
        })
      })
  }

}

const saveIDToSearch = (text) => {
  return ({
    type: 'SAVE_ID_TO_SEARCH',
    text
  })
}

const showCompleteReceipt = (idReceipt) => {

  return dispatch => {
    return axios.get(
      SERVER_PATH + SALES_PATH + PROCESSED_SALES_PATH + '/' + idReceipt,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'SHOW_COMPLETE_RECEIPT',
          saleSelected: response.data.result,
        })
      })
  }

}

const printSale = (idReceipt) => {

  return () => {
    return axios.post(
      SERVER_PATH + SETTINGS_PATH + PRINT_PATH,
      {
        saleID: idReceipt
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
  }

}

export {
  hideCompleteReceipt,
  getLastReceipts,
  getReceiptById,
  saveIDToSearch,
  showCompleteReceipt,
  printSale
}