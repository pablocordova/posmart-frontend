import React, { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { Nav, Navbar, MenuItem, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Sale from '../components/Sale'
import Setting from '../components/Setting' 

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href='/'>POSMART</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <LinkContainer to = '/sale'> 
                <NavItem eventKey = {1}>Venta</NavItem>
              </LinkContainer>
              <LinkContainer to = '/Setting'>
                <NavItem eventKey = {2}>Configuración</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar>

          <Route path = '/sale' component = { Sale } />
          <Route path = '/setting' component = { Setting } />
        </div>
      </BrowserRouter>
    )
  }

}

export default App