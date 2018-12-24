import React, { Component } from "react"
import Transaction from "../Components/Transaction"
import {Table, FormControl, Button} from 'react-bootstrap'

export default class CategoryDetails extends Component {

  render() {
    let categoryTotal;

    if (this.props.transactions) {
      categoryTotal = this.props.transactions.map(transaction => transaction.amount)

      let reducer = (accumulator, currentValue) => accumulator + currentValue
      categoryTotal = categoryTotal.reduce(reducer)
      categoryTotal = Math.floor(categoryTotal * 100) / 100
    }

    return (
      <div>
      {this.props.selectedCategory ? this.props.selectedCategory.name : null}
        <Table bordered condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
          {this.props.transactions ? this.props.transactions.map(transaction => (
            <Transaction key={transaction.id} transaction={transaction}/>)) : null
          }
          </tbody>
        </Table>

        <Table>
          <thead>
            <tr>
              Add a New Expense
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
              <form>
                <FormControl
                  id="formControlsText"
                  type="date"
                  label="Text"
                  placeholder="Date"
                />
              </form>
              </td>
              <td>
              <form>
                <FormControl
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="Description"
                />
              </form>
              </td>
              <td>
              <form>
                {this.props.selectedCategory ? this.props.selectedCategory.name : null}
              </form>
              </td>
              <td>
              <form>
                <FormControl
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="$ Amount"
                />
              </form>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
              <Button bsStyle="primary">
                <div>
                  Add Expense
                </div>
              </Button>
              </td>
            </tr>
          </tbody>
        </Table>

        <Table bordered condensed hover>
          <thead>
            {this.props.selectedCategory ? <th>{this.props.selectedCategory.name}</th>: null }
            <th>Total</th>
            <th>{categoryTotal}</th>
          </thead>
        </Table>
      </div>
    )
  }
}
