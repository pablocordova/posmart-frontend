import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {
  ControlLabel,
  Table,
  FormGroup,
  FormControl,
  Grid,
  Row
} from 'react-bootstrap'
import { connect } from 'react-redux'

import 'font-awesome/css/font-awesome.min.css';

// -- Own Modules
import {
  getLastReceipts,
  getReceiptById,
  saveIDToSearch,
  showCompleteReceipt
} from '../actions/receipts'

import {
  copyReceiptToSale
} from '../actions/sale'

import ViewReceipt from './ViewReceipt'

class Receipts extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Grid>
          <Row>
            <div>
              <h2>RECIBOS</h2>
              <FormGroup>
                <ControlLabel>ID:</ControlLabel>
                <FormControl
                  type = 'text'
                  placeholder = 'ticket id'
                  onChange = { e =>
                    this.props.saveIDToSearch(e.target.value)
                  }
                />
              </FormGroup>
              <RaisedButton
                label = 'Obtener'
                primary = { true }
                onClick = { () =>
                  this.props.getReceiptById(this.props.idToSearch)
                }
              ></RaisedButton>
              <FormGroup>
                <ControlLabel>10 Ultimos:</ControlLabel>
                <div>
                  <RaisedButton
                    label = 'Obtener'
                    primary = { true }
                    onClick = { () =>
                      this.props.getLastReceipts()
                    }
                  ></RaisedButton>
                </div>
              </FormGroup>
              <Table responsive>
                <thead>
                  <tr className = 'text-center-header-table'>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className = 'row-table-selected'>
                  {
                    this.props.sales.map(sale => {
                      return (
                        <tr key = { sale._id } className = 'text-center'>
                          <td>{ String(sale._id).substring(0, 8) }</td>
                          <td>{ moment.utc(sale.date).format('DD/MM/YY') }</td>
                          <td>{ moment.utc(sale.date).format('hh:mm:ss a') }</td>
                          <td>{ sale.total }</td>
                          <td className = 'spread-two-icons'>
                            <i className = 'fa fa-eye fa-lg' id = { sale._id } onClick = { (e) =>
                              this.props.showCompleteReceipt(e.target.id)
                            }></i>
                            <i className = 'fa fa-files-o fa-lg' id = { sale._id } onClick = {
                              (e) => {
                                this.props.copyReceiptToSale(e.target.id)
                                this.props.history.push('/sale')
                              }
                            }></i>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
              <ViewReceipt />
            </div>
          </Row>
        </Grid>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  console.log(state.receipts.sales)
  return {
    sales: state.receipts.sales,
    idToSearch: state.receipts.idToSearch
  }
}

const mapDispatchToProps = dispatch => {
  return {
    copyReceiptToSale(idReceipt) {
      dispatch(copyReceiptToSale(idReceipt))
    },
    getLastReceipts() {
      dispatch(getLastReceipts())
    },
    getReceiptById(idReceipt) {
      dispatch(getReceiptById(idReceipt))
    },
    saveIDToSearch(text) {
      dispatch(saveIDToSearch(text))
    },
    showCompleteReceipt(idReceipt) {
      dispatch(showCompleteReceipt(idReceipt))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Receipts)
