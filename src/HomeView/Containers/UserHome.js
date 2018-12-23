import React, { Component } from "react"
import Summary from "./Summary"
import CategoryContainer from "./CategoryContainer"
import CategoryDetails from "../../CategoryView/Containers/CategoryDetails"
import {Route, Switch} from 'react-router-dom'

export default class UserHome extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: null,
      transactions: null,
      categoryTransactions: null,
      categories: ["Auto & Transport", "Bills & Utilities", "Education", "Entertainment", "Food & Dining", "Gifts & Donations", "Health & Fitness", "Miscellaneous", "Shopping", "Travel"],
      selectedCategory: null,
      selectedCategoryTransactions: null
    }
  }

  fetchUserTransactions = () => {
    fetch(`http://localhost:3001/users/${this.props.userId}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          transactions: json.transactions
        })
      })
  }

  fetchCategoryTransactions = () => {
    fetch(`http://localhost:3001/categories`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          categoryTransactions: json
        })
      })
  }

  componentDidMount() {
    this.fetchUserTransactions()
    this.fetchCategoryTransactions()
  }


  setCategory = (categoryName, categoryTransactions) => {
    this.setState({
      selectedCategory: categoryName,
      selectedCategoryTransactions: categoryTransactions
    })
  }


  render() {
    return (
      <div>
        <Switch>
        <Route path='/users/:id/:categoryId' render={props => {
          let categoryId = props.match.params.categoryId
          let userId = props.match.params.id
          let selectedCategory;
          let transactions;

          if (this.state.categoryTransactions) {
            selectedCategory = this.state.categoryTransactions.filter(categoryObject => categoryObject.id === parseInt(categoryId))[0]

            transactions = selectedCategory.transactions.filter(transactionObject => transactionObject.user.id === parseInt(userId))

            selectedCategory.transactions = null
            selectedCategory.users = null
          }

          return (
            <CategoryDetails
              selectedCategory={selectedCategory}
              transactions={transactions}
            />
          )
        }} />

        <Route path='/users/:id' render={props => {
          return (
            <div>
            <Summary />
              <CategoryContainer
                transactions={this.state.transactions} categories={this.state.categories}
                setCategory={this.state.setCategory}
              />
            </div>
          )
        }} />
        </Switch>
      </div>
    )
  }
}
