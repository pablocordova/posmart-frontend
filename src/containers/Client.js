
// -- External Modules

// Main module
import React, { Component } from 'react'
// Other modules
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import { FormGroup, FormControl, Row, Grid, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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

class Client extends Component {
  /*
  componentDidMount() {
    this.props.loadClients()
  }
  */
  render() {
    return (
      <div>
        <form>
          <Grid>
            <Row>
              <Col md = { 12 }>
                <h2>CLIENTES</h2>
                <FormGroup>
                  <FormControl
                    type = 'text'
                    placeholder = 'Buscar cliente por nombre'
                    onChange = { e =>
                      this.props.filterClients(e.target.value)
                    }
                  />
                </FormGroup>
                <MuiThemeProvider>
                  <RaisedButton
                    label = 'NUEVO'
                    primary = { true }
                    onClick = { () =>
                      this.props.showCreateClient()
                    }
                  ></RaisedButton>
                </MuiThemeProvider>
              </Col>
            </Row>
            <Row>
              <Col md = { 12 }>
                <MuiThemeProvider>
                  <Table onCellClick = { (index, col) => {
                    // No event when click in client options
                    if (col !== 5) {
                      this.props.clientToSale(index)
                      this.props.history.push('/sale')
                    }
                  }}>
                    <TableHeader displaySelectAll = { false } adjustForCheckbox = { false }>
                      <TableRow>
                        <TableHeaderColumn>Nombres</TableHeaderColumn>
                        <TableHeaderColumn>Apellidos</TableHeaderColumn>
                        <TableHeaderColumn>DNI</TableHeaderColumn>
                        <TableHeaderColumn>Telefono</TableHeaderColumn>
                        <TableHeaderColumn>Dirección</TableHeaderColumn>
                        <TableHeaderColumn></TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox = { false }>
                      {
                        this.props.clientsFiltered.map(client => {
                          return (
                            <TableRow key = { client._id }>
                              <TableRowColumn>{ client.firstname }</TableRowColumn>
                              <TableRowColumn>{ client.lastname }</TableRowColumn>
                              <TableRowColumn>{ client.dni }</TableRowColumn>
                              <TableRowColumn>{ client.phone }</TableRowColumn>
                              <TableRowColumn>{ client.address }</TableRowColumn>
                              <TableRowColumn>
                                <i className = 'fa fa-pencil' id = { client._id } onClick = { e =>
                                  this.props.showModifyClient(e.target.id)
                                }></i>
                                <i className = 'fa fa-trash' id = { client._id } onClick = { e => {
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
                              </TableRowColumn>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </MuiThemeProvider>
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