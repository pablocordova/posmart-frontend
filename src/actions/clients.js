import axios from 'axios'

const CLIENTS_PATH = '/customers'

const clientToSale = (indexClientFiltered) => {
  return ({
    type: 'CLIENT_TO_SALE',
    indexClientFiltered
  })
}

const createClient = (client) => {
  return () => {
    return axios.post(process.env.REACT_APP_SERVER_PATH + CLIENTS_PATH, client)
      .then(response => {
        console.log(response.data)
      })
  }
}

const deleteClient = (idClient) => {
  return () => {
    return axios.delete(process.env.REACT_APP_SERVER_PATH + CLIENTS_PATH + '/' + idClient)
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
      process.env.REACT_APP_SERVER_PATH + CLIENTS_PATH,
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
      process.env.REACT_APP_SERVER_PATH + CLIENTS_PATH + '/' + client.id, client,
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