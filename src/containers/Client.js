
// -- External Modules

// Main module
import React, { Component } from 'react'
// Other modules
import { Row, Grid, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { green500, indigo500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

import ContentReply from 'material-ui/svg-icons/content/reply'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton'
import swal from 'sweetalert2'

import 'font-awesome/css/font-awesome.min.css';

// -- Own Modules
import {
  clientToSale,
  deleteClient,
  filterClients,
  loadClients,
  showModifyClient,
  showCreateClient
} from '../actions/clients'

import FormClient from './FormClient'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    accent1Color: green500
  }
});

const underlineStyle =  {
  borderColor: green500
}

const floatingLabelStyle = {
  color: indigo500
}

class Client extends Component {

  render() {
    return (
      <div>
        <form>
          <Grid>
            <Row>
              <MuiThemeProvider muiTheme={ muiTheme }>
                <Col md = { 12 }>
                  <div>
                    <TextField
                      hintText="Nombre completo"
                      floatingLabelText="BUSCAR CLIENTE"
                      underlineFocusStyle = { underlineStyle }
                      floatingLabelStyle = { floatingLabelStyle }
                      onChange = { e =>
                        this.props.filterClients(e.target.value)
                      }
                    />
                  </div>
                  <RaisedButton
                    label = 'VENTA'
                    icon = { <ContentReply/> }
                    onClick = { () =>
                      this.props.history.push('/sale')
                    }
                  ></RaisedButton>
                  <RaisedButton
                    label = 'NUEVO'
                    secondary = { true }
                    onClick = { () =>
                      this.props.showCreateClient()
                    }
                  ></RaisedButton>
                </Col>
              </MuiThemeProvider>
            </Row>
            <Row>
              <Col md = { 12 }>
                <Table>
                  <thead>
                    <tr className = 'text-center-header-table'>
                      <th>Nombre completo</th>
                      <th>DNI</th>
                      <th>Telefono</th>
                      <th>Dirección</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className = 'row-table-selected'>
                    {
                      this.props.clientsFiltered.map(client => {
                        return (
                          <tr key = { client._id } className = 'text-center' onClick = { e => {
                            if ( typeof e.target.cellIndex !== 'undefined') {
                              this.props.clientToSale(e.currentTarget.rowIndex - 1)
                              this.props.history.push('/sale')
                            }
                          }}>
                            <td>{ client.firstname }</td>
                            <td>{ client.dni }</td>
                            <td>{ client.phone }</td>
                            <td>{ client.address }</td>
                            <td className = 'spread-two-icons'>
                              <i
                                className = 'fa fa-pencil fa-lg'
                                id = { client._id }
                                onClick = { e =>
                                  this.props.showModifyClient(e.target.id)
                                }
                              ></i>
                              <i
                                className = 'fa fa-trash fa-lg'
                                id = { client._id }
                                onClick = { e => {
                                  // First make restriction case only exits 1 client
                                  if (this.props.clients.length === 1) {
                                    swal(
                                      'Oops...',
                                      'Debe existir al menos 1 cliente!',
                                      'error'
                                    )
                                    return 0
                                  }
                                  let deleteClientMethod = this.props.deleteClient
                                  let idClient = e.target.id
                                  swal({
                                    title: 'Esta seguro de eliminar el cliente?',
                                    text: 'No será posible recuperarlo después!',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Si, borrarlo!',
                                    cancelButtonText: 'Cancelar'
                                  }).then(function (result) {
                                    if (result.value) {
                                      deleteClientMethod(idClient)
                                    }
                                  })
                                }}
                              ></i>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Grid>
        </form>
        <FormClient/>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    clients: state.clients.clients,
    clientsFiltered: state.clients.clientsFiltered
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clientToSale(index) {
      dispatch(clientToSale(index))
    },
    deleteClient(idClient) {
      dispatch(deleteClient(idClient))
        .then(() => dispatch(loadClients()))
    },
    filterClients(textClientSearcher) {
      dispatch(filterClients(textClientSearcher))
    },
    loadClients() {
      dispatch(loadClients())
    },
    showModifyClient(client) {
      dispatch(showModifyClient(client))
    },
    showCreateClient() {
      dispatch(showCreateClient())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client)