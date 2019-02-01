import React from "react"

const Summary = props => (
  <div>
    <h1><strong>Your Personal Spending Summary</strong></h1>
    <br/>
    You have spent <strong>${calculateTotal(props.transactions)}</strong> in <strong>{props.currentMonth}</strong>!
  </div>
)

const calculateTotal = (array) => {
    let monthTotal;
    let monthTransactionsAmt = array.map(transaction => transaction.amount)

    if (!monthTransactionsAmt.length > 0) {
      monthTotal = 0.00
    } else {
      monthTotal = transactionsReducer(monthTransactionsAmt)
    }
    return monthTotal
  }

const transactionsReducer = (arr) => {
    let reducer = (accumulator, currentValue) => accumulator + currentValue
    let total = arr.reduce(reducer)
    let floatTotal = Math.floor(total * 100) / 100
    return floatTotal
  }

export default Summary
