import React, { Component } from "react"
import Summary from "./Summary"
import CategoryContainer from "./CategoryContainer"
import CategoryDetails from "../../CategoryView/Containers/CategoryDetails"
import {Route, Switch} from 'react-router-dom'

export default class UserHome extends Component {

  constructor() {
    super()
    this.state = {
      categoryTransactions: null,
    }
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
    this.fetchCategoryTransactions()
  }

  handleCategoryBarClick = (categoryId) => {
    debugger
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
          let userId = props.match.params.id
          return (
            <div>
            <Summary />
              <CategoryContainer
                transactions={this.state.categoryTransactions}
                userId={userId}
                handleCategoryBarClick={this.handleCategoryBarClick}
              />
            </div>
          )
        }} />
        </Switch>
      </div>
    )
  }
}
