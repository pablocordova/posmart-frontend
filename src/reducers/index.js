import { combineReducers } from 'redux'
import clients from './clients'
import login from './login'
import products from './products'

const reducer = combineReducers({
  clients,
  login,
  products
})

export default reducer