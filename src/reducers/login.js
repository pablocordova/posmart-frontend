const sale = ( state = {
  validBusiness: null,
  validEmail: null,
  validPass: null
}, action) => {

  switch (action.type) {
    case 'SHOW_ERROR': {

      let validBusiness = null
      let validEmail = null
      let validPass = null

      switch (action.typeError) {
        case 'code': {
          validBusiness = 'error'
          validEmail = state.validEmail
          validPass = state.validPass
          break
        }
        case 'email': {
          validEmail = 'error'
          validBusiness = state.validBusiness
          validPass = state.validPass
          break
        }
        case 'pass': {
          validPass = 'error'
          validBusiness = state.validBusiness
          validEmail = state.validEmail
          break
        }
        default:
          break
      }
      return {
        ...state,
        validBusiness: validBusiness,
        validEmail: validEmail,
        validPass: validPass
      }
    }
    case 'SHOW_MESSAGE_ERROR': {

      let validBusiness = null
      let validEmail = null
      let validPass = null

      switch (action.errorMessage) {
        case 'Business not found': {
          validBusiness = 'error'
          break
        }
        case 'User doesnt exits': {
          validEmail = 'error'
          break
        }
        case 'Incorrect password': {
          validPass = 'error'
          break
        }
        default:
          break
      }
      return {
        ...state,
        validBusiness: validBusiness,
        validEmail: validEmail,
        validPass: validPass
      }
    }
    case 'REMOVE_ERROR': {

      let validBusiness = null
      let validEmail = null
      let validPass = null

      switch (action.typeErrorToRemove) {
        case 'code': {
          validEmail = state.validEmail
          validPass = state.validPass
          break
        }
        case 'email': {
          validBusiness = state.validBusiness
          validPass = state.validPass
          break
        }
        case 'pass': {
          validBusiness = state.validBusiness
          validEmail = state.validEmail
          break
        }
        default:
          break
      }
      return {
        ...state,
        validBusiness: validBusiness,
        validEmail: validEmail,
        validPass: validPass
      }
    }
    default:
      return state
  }

}

export default sale