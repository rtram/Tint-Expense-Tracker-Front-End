import React, { Component } from "react"
import Transaction from "../Components/Transaction"
import ExpenseForm from "../Components/ExpenseForm"
import {Table} from 'react-bootstrap'

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

        <ExpenseForm selectedCategory={this.props.selectedCategory} transactions={this.props.transactions} />

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
