import React, { Component } from "react"
import Summary from "./Summary"
import CategoryContainer from "./CategoryContainer"
import CategoryDetails from "../../CategoryView/Containers/CategoryDetails"
import {Route, Switch} from 'react-router-dom'
import {Jumbotron} from "react-bootstrap"

export default class UserHome extends Component {

  constructor() {
    super()
    this.state = {
      transactions: null,
      currentMonthTransactions: null
    }
  }

  componentDidMount() {
    this.fetchTransactions()
  }

  fetchTransactions = () => {
    let userId = this.props.userId
    fetch(`http://localhost:3001/users/${userId}`)
      .then(res => res.json())
      .then(json => {

        // FILTERS CURRENT MONTH TRANSACTIONS ==================================
        let currentMonthTransactions = json.transactions.filter(transactionObject => {
          let transactionMonthInt = parseInt(transactionObject.date.split("-")[1])
          let presentMonth = new Date().getMonth() + 1
          return presentMonth === transactionMonthInt
        })

        this.setState({
          transactions: json.transactions,
          currentMonthTransactions: currentMonthTransactions
        })
      })
  }

  addTransaction = (transactionObject) => {
    let allTransactions = [...this.state.transactions, transactionObject]

    let currentMonthTransactions = allTransactions.filter(transactionObject => {
      let transactionMonthInt = parseInt(transactionObject.date.split("-")[1])
      let presentMonth = new Date().getMonth() + 1
      return presentMonth === transactionMonthInt
    })

    this.setState({
      transactions: allTransactions,
      currentMonthTransactions: currentMonthTransactions
    })
  }

  handleDelete = (transactionObject) => {
    fetch(`http://localhost:3001/transactions/${transactionObject.id}`, {
      method: "DELETE"
    })

    let copyOfTransactions = [...this.state.transactions]
    let index = this.state.transactions.indexOf(transactionObject)
    copyOfTransactions.splice(index, 1)
    this.setState({
      transactions: copyOfTransactions
    })
  }

  handleTransactionArrayUpdate = (updateObject, transactionObject) => {
    let copyOfTransactions = [...this.state.transactions]
    let index = copyOfTransactions.indexOf(transactionObject)
    copyOfTransactions.splice(index, 1, updateObject)

    let currentMonthTransactions = copyOfTransactions.filter(transactionObject => {
      let transactionMonthInt = parseInt(transactionObject.date.split("-")[1])
      let presentMonth = new Date().getMonth() + 1
      return presentMonth === transactionMonthInt
    })

    this.setState({
      transactions: copyOfTransactions,
      currentMonthTransactions: currentMonthTransactions
    })
  }

  render() {

    //GET CURRENT MONTH=========================================================
    let months    =['January','February','March','April','May','June','July','August','September','October','November','December']

    let currentMonthGetter = () => {
      let index = new Date().getMonth()
      return months[index]
    }

    let currentMonth = currentMonthGetter()

    return (
      <div>
        <Switch>
        <Route path='/users/:id/:categoryId' render={props => {
          let categoryId = props.match.params.categoryId
          let userId = props.match.params.id
          let selectedCategory;
          let userCurrentTransactions;
          let currentUserObject;

          if (this.state.transactions) {
            currentUserObject = this.state.transactions.find(transactionObject => transactionObject.user.id === parseInt(userId)).user
          }

          if (this.state.transactions) {
            selectedCategory = this.state.transactions.filter(transactionObject => transactionObject.category.id === parseInt(categoryId))
            selectedCategory = selectedCategory[0].category

            userCurrentTransactions = this.state.currentMonthTransactions.filter(transactionObject => (transactionObject.category.id === parseInt(categoryId)))
          }

          return (
            <CategoryDetails
              selectedCategory={selectedCategory}
              transactions={userCurrentTransactions}
              userObject={currentUserObject}
              addTransaction={this.addTransaction}
              handleDelete={this.handleDelete}
              handleTransactionArrayUpdate={this.handleTransactionArrayUpdate}
              currentMonth={currentMonth}
            />
          )
        }} />

        <Route path='/users/:id' render={props => {
          let userId = props.match.params.id
          let currentUserObject;

          if (this.state.transactions) {
            currentUserObject = this.state.transactions.find(transactionObject => transactionObject.user.id === parseInt(userId)).user
          }

          return (
            <div>
            <Jumbotron className="Jumbotron">
              <h1>Welcome Back {currentUserObject ? currentUserObject.first_name : null}!</h1>
            </Jumbotron>

            <Summary
              transactions={this.state.currentMonthTransactions}
              currentMonth={currentMonth}
            />
            <CategoryContainer
              transactions={this.state.currentMonthTransactions}
              userObject={currentUserObject}
              currentMonth={currentMonth}
            />
            </div>
          )
        }} />
        </Switch>
      </div>
    )
  }
}
