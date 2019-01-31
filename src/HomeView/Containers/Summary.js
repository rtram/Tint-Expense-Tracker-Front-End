import React, { Component } from "react"

export default class Summary extends Component {

  calculateTotal = (array) => {
    let monthTotal;
    let monthTransactionsAmt = array.map(transaction => transaction.amount)

    if (!monthTransactionsAmt.length > 0) {
      monthTotal = 0.00
    } else {
      monthTotal = this.transactionsReducer(monthTransactionsAmt)
    }
    return monthTotal
  }

  transactionsReducer = (arr) => {
    let reducer = (accumulator, currentValue) => accumulator + currentValue
    let total = arr.reduce(reducer)
    let floatTotal = Math.floor(total * 100) / 100
    return floatTotal
  }

  render() {
    return (
      <div>
        <h1><strong>Your Personal Spending Summary</strong></h1>
        <br/>
        You have spent <strong>${this.calculateTotal(this.props.transactions)}</strong> in <strong>{this.props.currentMonth}</strong>!
      </div>
    )
  }
}
