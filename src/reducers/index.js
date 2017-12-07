import { combineReducers } from 'redux'
import clients from './clients'
import login from './login'
import products from './products'
import receipts from './receipts'
import sale from './sale'

const reducer = combineReducers({
  clients,
  login,
  products,
  receipts,
  sale
})

export default reducer