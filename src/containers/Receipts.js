import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { green500, indigo500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import {
  Table,
  FormGroup,
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

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    accent1Color: green500
  }
});

const underlineStyle =  {
  borderColor: green500
}

const floatingLabelStyle = {
  color: indigo500
}

const buttonSearchStyle = {
  marginLeft: '15px'
}

class Receipts extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <Grid>
          <Row>
            <div>
              <TextField
                hintText="Id del recibo"
                floatingLabelText="BUSCAR POR ID"
                underlineFocusStyle = { underlineStyle }
                floatingLabelStyle = { floatingLabelStyle }
                onChange = { e =>
                  this.props.saveIDToSearch(e.target.value)
                }
              />
              <RaisedButton
                label = 'Buscar'
                secondary = { true }
                style = { buttonSearchStyle }
                onClick = { () => {
                  if (this.props.idToSearch.trim() !== '') {
                    this.props.getReceiptById(this.props.idToSearch)
                  }
                }}
              ></RaisedButton>
              <FormGroup>
                <div>
                  <RaisedButton
                    label = 'Ultimos 10'
                    secondary = { true }
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
