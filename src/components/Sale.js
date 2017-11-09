import { Component } from 'react'
import ChooseProduct from '../containers/ChooseProduct'
import ListProducts from '../containers/ListProducts'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import FlatButton from 'material-ui/FlatButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Sale extends Component {

  render() {
    return (
      <div>
        <div>
          <MediaQuery maxDeviceWidth = { 767 }>

            <MuiThemeProvider>
              <FlatButton
                labelPosition = 'before'
                primary = { true }
                icon =  { <ActionAndroid /> }
              >
                <Link to = '/listProducts'>
                  Lista
                </Link>
              </FlatButton>
            </MuiThemeProvider>
          </MediaQuery>
        </div>
        <Grid>
          <Row>
            <Col sm = { 4 }>
              <ChooseProduct />
            </Col>
            <MediaQuery minDeviceWidth = { 768 }>
              <Col sm = { 4 }>
                <ListProducts />
              </Col>
            </MediaQuery>
          </Row>
        </Grid>
      </div>
    )
  }

}

export default Sale
