import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

import Client from '../containers/Client'
import Sale from '../components/Sale'
import Setting from '../components/Setting'
import ListProducts from '../containers/ListProducts'
import Login from '../containers/Login'

class App extends Component {

  constructor(){
    super()
    this.state = {
      token: '',
      username: ''
    }
  }

  logout() {
    localStorage.removeItem('token')
    window.location = '/'
  }

  render() {

    let navbarOptions = null

    if (localStorage.getItem('token') === null) {
      navbarOptions = (
        <Nav pullRight>
          <LinkContainer to = '/login'>
            <NavItem eventKey = {1}>Login</NavItem>
          </LinkContainer>
        </Nav>
      )
    } else {
      navbarOptions = (
        <Nav pullRight>
          <LinkContainer to = '/sale'>
            <NavItem eventKey = {1}>Venta</NavItem>
          </LinkContainer>
          <LinkContainer to = '/setting'>
            <NavItem eventKey = {2}>Configuración</NavItem>
          </LinkContainer>
          <NavItem eventKey = {3} onClick = { this.logout }>Salir</NavItem>
        </Nav>
      )
    }

    return (
      <BrowserRouter>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href='/'>POSMART</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              { navbarOptions }
            </Navbar.Collapse>
          </Navbar>

          <Route path = '/login' component = { Login } />

          <Route path = '/client' component = { Client } />
          <Route path = '/sale' component = { Sale } />
          <Route path = '/setting' component = { Setting } />
          <Route path = '/listProducts' component = { ListProducts } />
        </div>
      </BrowserRouter>

    )
  }

}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    token: state.login.token
  }
}

export default connect(
  mapStateToProps
)(App)