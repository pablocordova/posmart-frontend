const receipts = ( state = {
  sales: [],
  saleSelected: {
    products: [],
    client: {
      name: ''
    }
  },
  idToSearch: '',
  isVisibleCompleteReceipt: false
}, action) => {

  switch (action.type) {
    case 'HIDE_COMPLETE_RECEIPT':
      return {
        ...state,
        isVisibleCompleteReceipt: false
      }
    case 'LOAD_RECEIPT':
      return {
        ...state,
        sales: action.receipt
      }
    case 'LOAD_RECEIPT_ONE': {
      let sales = []
      if (action.receipt !== '') {
        sales = [ action.receipt ]
      }
      return {
        ...state,
        sales: sales
      }
    }
    case 'SAVE_ID_TO_SEARCH':
      return {
        ...state,
        idToSearch: action.text
      }
    case 'SHOW_COMPLETE_RECEIPT':
      return {
        ...state,
        isVisibleCompleteReceipt: true,
        saleSelected: action.saleSelected
      }
    default:
      return state
  }

}

export default receipts