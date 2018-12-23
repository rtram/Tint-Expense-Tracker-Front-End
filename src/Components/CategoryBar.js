import React, { Component } from "react"
import Transactions from "./Transactions"

export default class CategoryBar extends Component {

  render() {
    let categoryTotal;

    if (this.props.transactions) {
      let categoryTransactions = this.props.transactions.filter(transaction => transaction.category.name === this.props.category)

      categoryTransactions = categoryTransactions.map(transaction => transaction.amount)

      let reducer = (accumulator, currentValue) => accumulator + currentValue
      categoryTotal = categoryTransactions.reduce(reducer)
      categoryTotal = Math.floor(categoryTotal * 100) / 100
    }

    return (
      <div>
        <div>
          {this.props.category}
        </div>
        <div>
          {categoryTotal}
        </div>
      </div>
    )
  }
}
