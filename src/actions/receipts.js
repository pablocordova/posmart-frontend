import axios from 'axios'

const SALES_PATH = '/sales'
const LAST_SALES_PATH = '/last/10'
const BYID_SALES_PATH = '/byid'

const hideCompleteReceipt = () => {
  return ({
    type: 'HIDE_COMPLETE_RECEIPT'
  })
}

const getLastReceipts = () => {

  return dispatch => {
    return axios.get(
      process.env.REACT_APP_SERVER_PATH + SALES_PATH + LAST_SALES_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
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
      process.env.REACT_APP_SERVER_PATH + SALES_PATH + BYID_SALES_PATH + '/' + idReceipt,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
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

const showCompleteReceipt = (index) => {
  return ({
    type: 'SHOW_COMPLETE_RECEIPT',
    index
  })
}

export {
  hideCompleteReceipt,
  getLastReceipts,
  getReceiptById,
  saveIDToSearch,
  showCompleteReceipt
}