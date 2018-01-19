import axios from 'axios'

const LOGIN_PATH = '/login'

let SERVER_PATH = ''
let BASE_URL = ''

switch (process.env.REACT_APP_ENV) {
  case 'production':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_PRODUCTION;
    BASE_URL = process.env.REACT_APP_BASE_URL_PRODUCTION;
    break;
  case 'development':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_DEVELOPMENT;
    BASE_URL = process.env.REACT_APP_BASE_URL_DEVELOPMENT;
    break;
  default:
    break;
}

const login = (email, pass, code) => {

  return dispatch => {
    return axios.post(SERVER_PATH + LOGIN_PATH, {
      email: email,
      password: pass,
      code: code
    })
      .then(response => {
        if (typeof response.data.token !== 'undefined') {
          localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, response.data.token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('businessName', response.data.businessName.toUpperCase())
          localStorage.setItem('permissionDiscount', response.data.permissionDiscount)
          localStorage.setItem('permissionPin', response.data.permissionPin)
          window.location = BASE_URL.concat('/sale')
        } else {
          dispatch({
            type: 'SHOW_MESSAGE_ERROR',
            errorMessage: response.data.message,
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

}

const showError = (type) => {
  return ({
    type: 'SHOW_ERROR',
    typeError: type
  })
}

const removeError = (type) => {
  return ({
    type: 'REMOVE_ERROR',
    typeErrorToRemove: type
  })
}

export { login, showError, removeError }