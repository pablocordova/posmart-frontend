import { combineReducers } from 'redux'
import clients from './clients'
import login from './login'
import products from './products'
import sale from './sale'

const reducer = combineReducers({
  clients,
  login,
  products,
  sale
})

export default reducer