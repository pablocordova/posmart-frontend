const clients = (
  state = {
    clients: [],
    clientSelected: ''
  },
  action
) => {

  switch (action.type) {
    case 'LOAD_CLIENTS':
      return {
        ...state,
        clients: []
      }
    case 'CLIENT_SELECTED':
      return {
        ...state,
        clientSelected: ''
      }
    default:
      return state
  }

}

export default clients