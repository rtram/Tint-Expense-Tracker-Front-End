import React, { Component } from "react"

export default class CategoryBar extends Component {

  selectCategory = (categoryName, categoryTransactions) => {
    this.props.setCategory(categoryName, categoryTransactions)
  }

  render() {
    let categoryTotal;
    let categoryTransactions;
    let categoryObject;

    if (this.props.transactions) {
      categoryTransactions = this.props.transactions.filter(transaction => transaction.category.name === this.props.category)

      categoryObject = categoryTransactions[0].category

      categoryTotal = categoryTransactions.map(transaction => transaction.amount)

      let reducer = (accumulator, currentValue) => accumulator + currentValue
      categoryTotal = categoryTotal.reduce(reducer)
      categoryTotal = Math.floor(categoryTotal * 100) / 100
    }

    return (
      <div onClick={() => this.selectCategory(categoryObject, categoryTransactions)}>
        <div>
          {this.props.category}
        </div>
        <div>
          ${categoryTotal}
        </div>
      </div>
    )
  }
}
