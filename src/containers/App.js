import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Client from '../containers/Client'
import Sale from '../components/Sale'
import Setting from '../components/Setting'
import ListProducts from '../containers/ListProducts'

class App extends Component {

  render() {
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
              <Nav pullRight>
                <LinkContainer to = '/sale'>
                  <NavItem eventKey = {2}>Venta</NavItem>
                </LinkContainer>
                <LinkContainer to = '/Setting'>
                  <NavItem eventKey = {3}>Configuración</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route path = '/client' component = { Client } />
          <Route path = '/sale' component = { Sale } />
          <Route path = '/setting' component = { Setting } />
          <Route path = '/listProducts' component = { ListProducts } />
        </div>
      </BrowserRouter>
    )
  }

}

export default App