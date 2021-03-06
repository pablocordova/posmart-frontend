const clients = (
  state = {
    buttonFormClient: 'CREAR',
    clientIDForSale: '',
    clientsFiltered: [],
    clientNameForSale: '',
    clientForm: {
      id: '',
      firstname: '',
      lastname: '',
      dni: '',
      phone: '',
      address: ''
    },
    clients: [],
    clientSelected: '',
    titleFormClient: 'CREAR',
    isVisibleFormClients: false
  },
  action
) => {

  switch (action.type) {
    case 'CLIENT_TO_SALE':
      return {
        ...state,
        clientIDForSale: state.clientsFiltered[action.indexClientFiltered]._id,
        clientNameForSale: state.clientsFiltered[action.indexClientFiltered].firstname
      }
    case 'LOAD_CLIENTS': {
      // Check by default clients
      let initialState = {
        ...state,
        clients: action.clients,
        clientsFiltered: action.clients
      }
      if (state.clientIDForSale === '') {
        initialState['clientIDForSale'] = action.clients[0]._id
        initialState['clientNameForSale'] = action.clients[0].firstname
      }
      return initialState
    }
    case 'HIDE_CLIENT_FORM':
      return {
        ...state,
        isVisibleFormClients: false,
      }
    case 'FILTER_CLIENTS':
      return {
        ...state,
        clientsFiltered: state.clients.filter(e =>{
          return e.firstname.toLowerCase().indexOf(action.textClientSearcher.toLowerCase()) !== -1
        })
      }
    case 'RESET_CLIENT':
      return {
        ...state,
        clientIDForSale: state.clients[0]._id,
        clientNameForSale: state.clients[0].firstname
      }
    case 'SHOW_CREATE_CLIENT':
      return {
        ...state,
        buttonFormClient: 'CREAR',
        clientForm: {
          ...state.clientForm,
          id: '',
          firstname: '',
          lastname: '',
          dni: '',
          phone: '',
          address: '',
        },
        isVisibleFormClients: true,
        titleFormClient: 'CREAR'
      }
    case 'SHOW_MODIFY_CLIENT':{
      let clientSelected = state.clients.filter( client =>
        client._id === action.idClient
      ).pop()
      return {
        ...state,
        buttonFormClient: 'MODIFICAR',
        clientForm: {
          ...state.clientForm,
          id: clientSelected._id,
          firstname: clientSelected.firstname,
          lastname: clientSelected.lastname,
          dni: clientSelected.dni,
          phone: clientSelected.phone,
          address: clientSelected.address,
        },
        isVisibleFormClients: true,
        titleFormClient: 'MODIFICAR'
      }
    }
    default:
      return state
  }

}

export default clients