
// -- Exteral modules

// Main module
import React, { Component } from 'react'
// Other modules
import { Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { indigo500, green500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton'

// -- Own Modules
import {
  createClient,
  hideClientForm,
  loadClients,
  updateClient
} from '../actions/clients'

const headerModalStyle = {
  textAlign: 'center',
  background: '#3F51B5',
  color: 'white',
  paddingBottom: '10px',
  paddingTop: '15px'
}

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    accent1Color: green500
  }
});

class FormClient extends Component {

  constructor() {
    super()
    this.state = {
      validation: {
        name: null
      }
    }
  }

  cleanValidations() {
    this.setState(prevState  => ({
      validation: {
        ...prevState.validation,
        name: null
      }
    }))
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <Modal show = { this.props.isVisibleFormClients }>
            <Modal.Header style = { headerModalStyle}>
              <Modal.Title>{ this.props.titleFormClient }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup validationState = { this.state.validation.name }>
                <ControlLabel>Nombre Completo</ControlLabel>
                <FormControl
                  type = 'text'
                  defaultValue = { this.props.clientForm.firstname }
                  onChange = { e => {
                    this.props.clientForm.firstname = e.target.value
                    // Validations
                    let stateName = null
                    if (e.target.value.trim() === '') {
                      stateName = 'error'
                    }
                    this.setState(prevState  => ({
                      validation: {
                        ...prevState.validation,
                        name: stateName
                      }
                    }))
                  }}
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
                onClick = { () => {
                  this.props.hideClientForm()
                  this.cleanValidations()
                }}
              />
              <RaisedButton
                label = { this.props.buttonFormClient }
                secondary = { true }
                onClick = { () => {
                  const name = this.state.validation.name
                  if (name !== 'error' && this.props.clientForm.firstname.trim() !== '') {
                    if (this.props.clientForm.id === '') {
                      this.props.createClient(this.props.clientForm)
                    } else {
                      this.props.updateClient(this.props.clientForm)
                    }
                    this.props.hideClientForm()
                  } else {
                    this.setState(prevState  => ({
                      validation: {
                        ...prevState.validation,
                        name: 'error'
                      }
                    }))
                  }
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