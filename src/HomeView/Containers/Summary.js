import React, { Component } from "react"

export default class Summary extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    let summaryTotal;

    if (this.props.transactions) {
      summaryTotal = this.props.transactions.map(transaction => transaction.amount)

      let reducer = (accumulator, currentValue) => accumulator + currentValue
      summaryTotal = summaryTotal.reduce(reducer)
      summaryTotal = Math.floor(summaryTotal * 100) / 100

    }
    return (
      <div>
        You have spent <strong>${summaryTotal}</strong> in <strong>{this.props.currentMonth}</strong>!
      </div>
    )
  }
}
