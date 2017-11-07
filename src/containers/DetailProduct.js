import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux' 
import { showDetailProduct } from '../actions/products'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class DetailProduct extends Component {

  render() {
    return(
      <div>
        <Modal show = { this.props.modal } >
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Cantidad</ControlLabel>
                <FormControl
                  type = 'number'
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Medida</ControlLabel>
                <FormControl componentClass = 'select'>
                  <option value = 'unidad'>unidad</option>
                  <option value = 'docena'>docena</option>
                  <option value = 'bolsa'>bolsa</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Descuento</ControlLabel>
                <FormControl
                  type = 'number'
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick = { () => this.props.showDetailProduct(false) }>Close</Button>
            <Button bsStyle = 'primary'>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    modal: state.modal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showDetailProduct(show) {
      dispatch(showDetailProduct(show))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailProduct)