import { combineReducers } from 'redux'
import clients from './clients'
import products from './products'
import receipts from './receipts'
import sale from './sale'

const reducer = combineReducers({
  clients,
  products,
  receipts,
  sale
})

export default reducer