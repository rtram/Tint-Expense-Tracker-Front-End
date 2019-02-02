import React, { Component } from "react"
import CategoryButton from "../Components/CategoryButton"
import CategoryChartContainer from "../Components/CategoryChartContainer"
import '../HomeView.css'

export default class CategoryContainer extends Component {
  constructor() {
    super()
    this.state={
      categoryNames:["Auto & Transport", "Bills & Utilities", "Education", "Entertainment", "Food & Dining", "Gifts & Donations", "Health & Fitness", "Miscellaneous", "Shopping", "Travel"]
    }
  }

  // TAKES IN ARRAY OF INTEGERS AND RETURNS FLOAT SUM
  transactionsReducer = (arr) => {
    let reducer = (accumulator, currentValue) => accumulator + currentValue
    let total = arr.reduce(reducer)
    let floatTotal = Math.floor(total * 100) / 100
    return floatTotal
  }

  // RETURNS CATEGORY TOTAL
  categoryTotal = (count) => {
    let categoryTotal;

    let filteredTransactions = this.props.transactions.filter(transactionObject => transactionObject.category.id === count)

    if (filteredTransactions.length === 0) {
      return categoryTotal = 0
    }

    let categoryAmounts = filteredTransactions.map(transactionObject => transactionObject.amount)

    categoryTotal = this.transactionsReducer(categoryAmounts)
    return categoryTotal
  }

  // RETURNS ARRAY OF CATEGORY TOTAL OBJECTS
  categoryTotalObjects = () => {
    let categoryTotals = []
    for (let i = 1; i < 11; i++) {
      categoryTotals.push({
        id: i,
        name: this.state.categoryNames[i - 1],
        total: this.categoryTotal(i)
      })
    }
    return categoryTotals
  }

  // RETURNS ARRAY OF CATEGORY TOTALS FOR BAR GRAPH
  categoryTotals = () => {
    let categoryTotals = this.categoryTotalObjects().map(categoryObject => categoryObject.total)
    return categoryTotals
  }

  render() {

    return (
      <div class='category-container'>
        Here is where your money went in <strong>{this.props.currentMonth}</strong>

        {this.props.transactions ?
          <CategoryChartContainer
            categoryLabels={this.state.categoryNames}
            categoryTotals={this.categoryTotals()}
            currentMonth={this.props.currentMonth}
          /> :
          null
        }

        <div class='category-buttons-container'>
          <strong>Categories</strong>

          <div class='button-container'>
            <div class='button-group'>
              {this.props.transactions ? this.categoryTotalObjects().slice(0,5).map(categoryTotalObject =>
               <CategoryButton
                key={categoryTotalObject.id}
                categoryId={categoryTotalObject.id}
                categoryName={categoryTotalObject.name}
                categoryTotal={categoryTotalObject.total}
                userObject={this.props.userObject}
              />) : null
              }
            </div>

            <div class='button-group'>
              {this.props.transactions ? this.categoryTotalObjects().slice(5,11).map(categoryTotalObject =>
               <CategoryButton
                key={categoryTotalObject.id}
                categoryId={categoryTotalObject.id}
                categoryName={categoryTotalObject.name}
                categoryTotal={categoryTotalObject.total}
                userObject={this.props.userObject}
              />) : null
              }
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}
