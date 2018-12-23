import React, { Component } from "react"
import Transactions from "./Transactions"

export default class CategoryBar extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    let categoryTransactions = this.props.transactions.filter(transaction => transaction.category.name === this.props.category)
    return (
      <div>
        {categoryTransactions.map(transaction => <Transactions key={transaction.id} transaction={transaction}/>)}
      </div>
    )
  }
}
