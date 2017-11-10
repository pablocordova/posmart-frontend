import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Button, Row, Grid, Col } from 'react-bootstrap'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import { connect } from 'react-redux'
import { loadClients, clientSelected } from '../actions/clients'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


class Client extends Component {

  componentDidMount() {
    this.props.loadClients()
  }

  render() {
    return (
      <div>
        <form>
          <Grid>
            <Row>
              <Col md = { 12 }>
                <FormGroup>
                  <ControlLabel>CLIENTES</ControlLabel>
                  <FormControl
                    type = 'text'
                    placeholder = 'Buscar cliente'
                  />
                  <Button>Agregar</Button>
                  <Button>Modificar</Button>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md = { 12 }>
                <MuiThemeProvider>
                  <Table>
                    <TableHeader displaySelectAll = { false } adjustForCheckbox = { false }>
                      <TableRow>
                        <TableHeaderColumn>Nombres</TableHeaderColumn>
                        <TableHeaderColumn>Apellidos</TableHeaderColumn>
                        <TableHeaderColumn>DNI</TableHeaderColumn>
                        <TableHeaderColumn>Telefono</TableHeaderColumn>
                        <TableHeaderColumn>Dirección</TableHeaderColumn>
                        <TableHeaderColumn> </TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox = { false }>
                      <TableRow>
                        <TableRowColumn>Example</TableRowColumn>
                        <TableRowColumn>Example</TableRowColumn>
                        <TableRowColumn>Exa</TableRowColumn>
                        <TableRowColumn>Exa</TableRowColumn>
                        <TableRowColumn>Exa</TableRowColumn>
                        <TableRowColumn>Exa</TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                </MuiThemeProvider>
              </Col>
            </Row>
          </Grid>
        </form>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    clients: state.clients,
    selectingClient: state.selectingClient
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadClients() {
      dispatch(loadClients())
    },
    clientSelected(client) {
      dispatch(clientSelected(client))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client)