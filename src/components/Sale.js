import React, { Component } from 'react'
import ChooseProduct from '../containers/ChooseProduct'
import { Grid, Row, Col } from 'react-bootstrap'

class Sale extends Component {

  render() {
    return(
      <Grid>
        <Row>
        <Col sm={4}>
          <ChooseProduct />
        </Col>
        </Row>
      </Grid>
    )
  }

} 

export default Sale
