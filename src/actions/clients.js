const loadClients = () => {
  return ({
    type: 'LOAD_CLIENTS'
  })
}

const clientSelected = client => {
  return ({
    type: 'CLIENT_SELECTED',
    client
  })
}

export { loadClients, clientSelected }