import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './styles.css'

class ListProducts extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h2>PRODUCTS</h2>
          <Table>
            <TableHeader displaySelectAll = { false } adjustForCheckbox = { false }>
              <TableRow>
                <TableHeaderColumn className = 'little-cells-product'>Cant</TableHeaderColumn>
                <TableHeaderColumn className = 'little-cells-product'>Unid</TableHeaderColumn>
                <TableHeaderColumn className = 'description-product'>Descripción</TableHeaderColumn>
                <TableHeaderColumn className = 'little-cells-product'>Unid</TableHeaderColumn>
                <TableHeaderColumn className = 'little-cells-product'>Total</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox = { false }>
              <TableRow key = {1}>
                <TableRowColumn className = 'little-cells-product'>2</TableRowColumn>
                <TableRowColumn className = 'little-cells-product'>Saco</TableRowColumn>
                <TableRowColumn className = 'description-product'>Magia Blandca 333</TableRowColumn>
                <TableRowColumn className = 'little-cells-product'>23.2</TableRowColumn>
                <TableRowColumn className = 'little-cells-product'>46.4</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  console.log(state.sale)
  return state
}

export default connect(
  mapStateToProps
)(ListProducts)