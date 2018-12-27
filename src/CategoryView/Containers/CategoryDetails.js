import React, { Component } from "react"
import Transaction from "../Components/Transaction"
import ExpenseForm from "../Components/ExpenseForm"
import {Link} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'

export default class CategoryDetails extends Component {

  render() {
    let categoryTotal;

    if (this.props.transactions) {
      categoryTotal = this.props.transactions.map(transaction => transaction.amount)

      let reducer = (accumulator, currentValue) => accumulator + currentValue
      categoryTotal = categoryTotal.reduce(reducer)
      categoryTotal = Math.floor(categoryTotal * 100) / 100
    }

    //GET CURRENT MONTH=========================================================
    let months    =['January','February','March','April','May','June','July','August','September','October','November','December']

    let currentMonthGetter = () => {
      let index = new Date().getMonth()
      return months[index]
    }

    return (
      <div>

      {this.props.userObject ?
        <Link to={`/users/${this.props.userObject.id}/`}>
          <Button bsStyle="primary">
            Go Back
          </Button>
        </Link>: null }


      <strong>{currentMonthGetter()} Transactions</strong>

      {this.props.selectedCategory ? this.props.selectedCategory.name : null}
        <Table bordered condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {this.props.transactions ? this.props.transactions.map(transaction => (
            <Transaction key={transaction.id} transactionObject={transaction} handleDelete={this.props.handleDelete} handleTransactionArrayUpdate={this.props.handleTransactionArrayUpdate}/>)) : null
          }
          </tbody>
        </Table>

        <ExpenseForm
          selectedCategory={this.props.selectedCategory} transactions={this.props.transactions}
          userObject={this.props.userObject}
          addTransaction={this.props.addTransaction}
        />

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
