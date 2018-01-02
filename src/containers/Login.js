import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, showError, removeError } from '../actions/login'
import { FormControl, ControlLabel, FormGroup, Row, Grid, Col } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

const errorTextStyle = {
  color: '#A94442'
}

class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      pass: '',
      code: ''
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs = { 4 } xsOffset = { 4 }>
              <h2>INICIAR SESIÓN</h2>
              <MuiThemeProvider>
                <form>
                  <FormGroup validationState = { this.props.validBusiness }>
                    <ControlLabel>Empresa:</ControlLabel>
                    <FormControl
                      type = 'text'
                      placeholder = 'Ingrese código de empresa'
                      onChange = { (event) => {
                        this.props.removeError('code')
                        this.setState({
                          code: event.target.value
                        })
                      }}
                    />
                    <div
                      hidden = { this.props.validBusiness !== 'error' ||
                        this.state.code.trim() === ''
                      }
                      style = { errorTextStyle }
                    >
                      No existe empresa
                    </div>
                  </FormGroup>
                  <FormGroup  validationState = { this.props.validEmail }>
                    <ControlLabel>Correo:</ControlLabel>
                    <FormControl
                      type = 'text'
                      placeholder = 'Ingrese correo'
                      onChange = { (event) => {
                        this.props.removeError('email')
                        this.setState({
                          email: event.target.value
                        })
                      }}
                    />
                    <div
                      hidden = { this.props.validEmail !== 'error' ||
                        this.state.email.trim() === ''
                      }
                      style = { errorTextStyle }
                    >
                      No existe Usuario
                    </div>
                  </FormGroup>
                  <FormGroup  validationState = { this.props.validPass }>
                    <ControlLabel>Contraseña</ControlLabel>
                    <FormControl
                      type = 'password'
                      placeholder = 'Ingrese contraseña'
                      onChange = { (event) => {
                        this.props.removeError('pass')
                        this.setState({
                          pass: event.target.value
                        })
                      }}
                    />
                    <div
                      hidden = { this.props.validPass !== 'error'  ||
                        this.state.pass.trim() === ''
                      }
                      style = { errorTextStyle }
                    >
                      Contraseña incorrecta
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <RaisedButton
                      label = 'Entrar'
                      primary = { true }
                      onClick = { () => {
                        let code = this.state.code.trim()
                        let email = this.state.email.trim()
                        let pass = this.state.pass.trim()

                        if (code === '') {
                          this.props.showError('code')
                        }
                        if (email === '') {
                          this.props.showError('email')
                        }
                        if (pass === '') {
                          this.props.showError('pass')
                        }

                        if (code !== '' && email !== '' && pass !== '') {
                          this.props.login(this.state.email, this.state.pass, this.state.code)
                        }

                      }}
                    />
                  </FormGroup>
                </form>
              </MuiThemeProvider>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    validBusiness: state.login.validBusiness,
    validEmail: state.login.validEmail,
    validPass: state.login.validPass
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login(email, pass, code) {
      dispatch(login(email, pass, code))
    },
    showError(type) {
      dispatch(showError(type))
    },
    removeError(type) {
      dispatch(removeError(type))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)