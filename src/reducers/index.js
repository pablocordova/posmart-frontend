import { combineReducers } from 'redux'
import clients from './clients'
import products from './products'

const reducer = combineReducers({
  clients,
  products
})

export default reducer