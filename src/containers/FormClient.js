
// -- Exteral modules

// Main module
import React, { Component } from 'react'
// Other modules
import { Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

// -- Own Modules
import {
  createClient,
  hideClientForm,
  loadClients,
  updateClient
} from '../actions/clients'

class FormClient extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Modal show = { this.props.isVisibleFormClients }>
            <Modal.Header>
              <Modal.Title>{ this.props.titleFormClient }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Nombres</ControlLabel>
                <FormControl
                  type = 'text'
                  defaultValue = { this.props.clientForm.firstname }
                  onChange = { e =>
                    this.props.clientForm.firstname = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Apellidos</ControlLabel>
                <FormControl
                  type = 'text'
                  defaultValue = { this.props.clientForm.lastname }
                  onChange = { e =>
                    this.props.clientForm.lastname = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>DNI</ControlLabel>
                <FormControl
                  type = 'number'
                  defaultValue = { this.props.clientForm.dni }
                  onChange = { e =>
                    this.props.clientForm.dni = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Teléfono</ControlLabel>
                <FormControl
                  type = 'number'
                  defaultValue = { this.props.clientForm.phone }
                  onChange = { e =>
                    this.props.clientForm.phone = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Dirección</ControlLabel>
                <FormControl
                  type = 'text'
                  defaultValue = { this.props.clientForm.address }
                  onChange = { e =>
                    this.props.clientForm.address = e.target.value
                  }
                />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <RaisedButton
                label = 'CANCELAR'
                primary = { true }
                onClick = { () =>
                  this.props.hideClientForm()
                }
              />
              <RaisedButton
                label = { this.props.buttonFormClient }
                secondary = { true }
                onClick = { () => {
                  if (this.props.clientForm.id === '') {
                    this.props.createClient(this.props.clientForm)
                  } else {
                    this.props.updateClient(this.props.clientForm)
                  }
                  this.props.hideClientForm()
                }}
              />
            </Modal.Footer>
          </Modal>
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    isVisibleFormClients: state.clients.isVisibleFormClients,
    clientForm: state.clients.clientForm,
    titleFormClient: state.clients.titleFormClient,
    buttonFormClient: state.clients.buttonFormClient
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createClient(client) {
      dispatch(createClient(client))
        .then(() =>dispatch(loadClients()))
    },
    hideClientForm() {
      dispatch(hideClientForm())
    },
    loadClients() {
      dispatch(loadClients())
    },
    updateClient(client) {
      dispatch(updateClient(client))
        .then(() =>dispatch(loadClients()))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormClient)