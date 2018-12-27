import React, { Component } from "react"
import CategoryBar from "../Components/CategoryBar"

export default class CategoryContainer extends Component {

  render() {
    let categoryArrTotals = []

    if (this.props.transactions) {
      for (let i = 1; i < 11; i++) {
        let categoryName;

        let filteredCategoryTransactions = this.props.transactions.filter(transactionObject => transactionObject.category.id === i)

        categoryName = filteredCategoryTransactions[0].category.name

        let filteredCategoryTotal = filteredCategoryTransactions.map(transactionObject => transactionObject.amount)

        let reducer = (accumulator, currentValue) => accumulator + currentValue
        filteredCategoryTotal = filteredCategoryTotal.reduce(reducer)
        filteredCategoryTotal = Math.floor(filteredCategoryTotal * 100) / 100

        categoryArrTotals.push({
          id: i,
          name: categoryName,
          total: filteredCategoryTotal})
      }
    }

    //GET CURRENT MONTH=========================================================
    let months    =['January','February','March','April','May','June','July','August','September','October','November','December']

    let currentMonthGetter = () => {
      let index = new Date().getMonth()
      return months[index]
    }

    return (
      <div>
        How is {currentMonthGetter()} Looking?
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
