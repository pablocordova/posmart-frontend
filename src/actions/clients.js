import axios from 'axios'

const CLIENTS_PATH = '/customers'
let SERVER_PATH = ''

switch (process.env.REACT_APP_ENV) {
  case 'production':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_PRODUCTION;
    break;
  case 'development':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_DEVELOPMENT;
    break;
  default:
    break;
}

const clientToSale = (indexClientFiltered) => {
  return ({
    type: 'CLIENT_TO_SALE',
    indexClientFiltered
  })
}

const createClient = (client) => {
  return () => {
    return axios.post(
      SERVER_PATH + CLIENTS_PATH, client,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        console.log(response.data)
      })
  }
}

const deleteClient = (idClient) => {
  return () => {
    return axios.delete(
      SERVER_PATH + CLIENTS_PATH + '/' + idClient,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const filterClients = (textClientSearcher) => {
  return ({
    type: 'FILTER_CLIENTS',
    textClientSearcher
  })
}

const hideClientForm = () => {
  return ({
    type: 'HIDE_CLIENT_FORM'
  })
}

const loadClients = () => {
  return dispatch => {
    return axios.get(
      SERVER_PATH + CLIENTS_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'LOAD_CLIENTS',
          clients: response.data.result,
        })
      })
  }
}

const resetClient = () => {
  return ({
    type: 'RESET_CLIENT'
  })
}

const showCreateClient = () => {
  return ({
    type: 'SHOW_CREATE_CLIENT'
  })
}

const showModifyClient = (idClient) => {
  return ({
    type: 'SHOW_MODIFY_CLIENT',
    idClient
  })
}

const updateClient = client => {
  return () => {
    return axios.put(
      SERVER_PATH + CLIENTS_PATH + '/' + client.id, client,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        console.log(response.data)
      })
  }
}

export {
  clientToSale,
  createClient,
  deleteClient,
  filterClients,
  hideClientForm,
  loadClients,
  resetClient,
  showCreateClient,
  showModifyClient,
  updateClient
}