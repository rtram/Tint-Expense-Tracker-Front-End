import React, { Component } from "react"
import CategoryBar from "../Components/CategoryBar"
import CategoryBarChart from "../Components/CategoryContainerChart"

export default class CategoryContainer extends Component {

  render() {
    let categoryArrTotals = []

    if (this.props.transactions) {
      for (let i = 1; i < 11; i++) {
        let categoryName;

        let filteredCategoryTransactions = this.props.transactions.filter(transactionObject => transactionObject.category.id === i)

        categoryName =
        ["Auto & Transport", "Bills & Utilities", "Education", "Entertainment", "Food & Dining", "Gifts & Donations", "Health & Fitness", "Miscellaneous", "Shopping", "Travel"][i - 1]

        let filteredCategoryTotal = filteredCategoryTransactions.map(transactionObject => transactionObject.amount)

        if (filteredCategoryTotal.length > 0) {
          let reducer = (accumulator, currentValue) => accumulator + currentValue
          filteredCategoryTotal = filteredCategoryTotal.reduce(reducer)
          filteredCategoryTotal = Math.floor(filteredCategoryTotal * 100) / 100
        } else {
          filteredCategoryTotal = 0
        }

        categoryArrTotals.push({
          id: i,
          name: categoryName,
          total: filteredCategoryTotal})
      }
    }

    let categoryLabels = []
    let categoryTotals = []

    if (this.props.transactions) {
      categoryLabels = categoryArrTotals.map(categoryObject => categoryObject.name)

      categoryTotals = categoryArrTotals.map(categoryObject => categoryObject.total)
    }

    return (
      <div>
        How is each <strong>Spending Category</strong> looking in <strong>{this.props.currentMonth}</strong>?

        {this.props.transactions ?
          <CategoryBarChart
            categoryLabels={categoryLabels}
            categoryTotals={categoryTotals}
            currentMonth={this.props.currentMonth}
          /> :
          null
        }


        {this.props.transactions ? categoryArrTotals.map(categoryTotalObject =>
         <CategoryBar
          key={categoryTotalObject.id}
          categoryId={categoryTotalObject.id}
          categoryName={categoryTotalObject.name}
          categoryTotal={categoryTotalObject.total}
          userObject={this.props.userObject}
        />) : null
        }

      </div>
    )
  }
}
