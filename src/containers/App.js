import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

import Client from './Client'
import Sale from './Sale'
import Receipts from './Receipts'
import ListProducts from './ListProducts'
import Login from './Login'

let BASE_URL = ''

switch (process.env.REACT_APP_ENV) {
  case 'production':
    BASE_URL = process.env.REACT_APP_BASE_URL_PRODUCTION;
    break;
  case 'development':
    BASE_URL = process.env.REACT_APP_BASE_URL_DEVELOPMENT;
    break;
  default:
    break;
}

const backgroundNavbarStyle = {
  background: '#3F51B5',
  color: 'white'
}

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
    localStorage.removeItem('businessName')
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
            <NavItem eventKey = {1}>
              <i class = 'fa fa-file-text-o'></i>&ensp; Venta
            </NavItem>
          </LinkContainer>
          <LinkContainer to = '/receipts'>
            <NavItem eventKey = {2}>
              <i class = 'fa fa-list'></i>&ensp; Recibos
            </NavItem>
          </LinkContainer>
          <NavItem eventKey = {3} onClick = { this.logout }>
            <i class = 'fa fa-sign-out'></i>&ensp; Salir
          </NavItem>
        </Nav>
      )
    }

    return (
      <BrowserRouter basename = { BASE_URL }>
        <div>
          <Navbar collapseOnSelect style = { backgroundNavbarStyle }>
            <Navbar.Header>
              <Navbar.Brand>
                <a href=''> VENTAS { localStorage.getItem('businessName') }</a>
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
          <Route path = '/receipts' component = { Receipts } />
          <Route path = '/listProducts' component = { ListProducts } />
        </div>
      </BrowserRouter>

    )
  }

}

const mapStateToProps = state => {
  return state
}

export default connect(
  mapStateToProps
)(App)