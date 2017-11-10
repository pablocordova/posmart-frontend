import React, { Component } from 'react'
import ChooseProduct from '../containers/ChooseProduct'
import ListProducts from '../containers/ListProducts'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Sale extends Component {

  render() {
    return (
      <div>

        <MediaQuery maxDeviceWidth = { 767 }>
          <MuiThemeProvider>
            <div>
              <FlatButton
                labelPosition = 'before'
                primary = { true }
                icon =  { <ActionAndroid /> }
              >
                <Link to = '/listProducts'>
                  Lista
                </Link>
              </FlatButton>
              <FlatButton labelPosition = 'before' primary = { true } icon = { <ActionAndroid /> }>
                <Link to = '/client'>Cliente</Link>
              </FlatButton>
            </div>
          </MuiThemeProvider>
        </MediaQuery>

        <Grid>
          <Row>
            <Col sm = { 4 }>
              <ChooseProduct />
            </Col>
            <MediaQuery minDeviceWidth = { 768 }>
              <MuiThemeProvider>
                <Col sm = { 4 }>
                  <RaisedButton secondary = { true }>
                    <Link to = '/client'>Clientes</Link>
                  </RaisedButton>
                  <ListProducts />
                </Col>
              </MuiThemeProvider>
            </MediaQuery>
          </Row>
        </Grid>

      </div>
    )
  }

}

export default Sale
