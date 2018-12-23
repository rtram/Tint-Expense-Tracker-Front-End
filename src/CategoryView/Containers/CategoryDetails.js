import React, { Component } from "react"
import Transaction from "../Components/Transaction"

export default class CategoryDetails extends Component {

  render() {
    return (
      <div>
        {this.props.selectedCategory ? this.props.selectedCategory.name : null}
        {this.props.transactions ? this.props.transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction}/>)) : null
        }
      </div>
    )
  }
}
