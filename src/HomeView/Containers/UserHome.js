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
    }
  }

  fetchTransactions = () => {
    let userId = this.props.userId
    fetch(`http://localhost:3001/users/${userId}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          transactions: json.transactions
        })
      })
  }

  componentDidMount() {
    this.fetchTransactions()
  }

  addTransaction = (transactionObject) => {
    this.setState({ transactions: [...this.state.transactions, transactionObject] })
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

  render() {
    return (
      <div>
        <Switch>
        <Route path='/users/:id/:categoryId' render={props => {
          let categoryId = props.match.params.categoryId
          let userId = props.match.params.id
          let selectedCategory;
          let userTransactions;
          let currentUserObject;

          if (this.state.transactions) {
            currentUserObject = this.state.transactions.find(transactionObject => transactionObject.user.id === parseInt(userId)).user
          }

          if (this.state.transactions) {
            selectedCategory = this.state.transactions.filter(transactionObject => transactionObject.category.id === parseInt(categoryId))
            selectedCategory = selectedCategory[0].category

            userTransactions = this.state.transactions.filter(transactionObject => (transactionObject.user.id === parseInt(userId) && transactionObject.category.id === parseInt(categoryId)))
          }

          return (
            <CategoryDetails
              selectedCategory={selectedCategory}
              transactions={userTransactions}
              userObject={currentUserObject}
              addTransaction={this.addTransaction}
              handleDelete={this.handleDelete}
            />
          )
        }} />

        <Route path='/users/:id' render={props => {
          let userId = props.match.params.id
          let userTransactions;
          let currentUserObject;

          if (this.state.transactions) {
            currentUserObject = this.state.transactions.find(transactionObject => transactionObject.user.id === parseInt(userId)).user
          }

          if (this.state.transactions) {
            userTransactions = this.state.transactions.filter(transactionObject => (transactionObject.user.id === parseInt(userId)))
          }

          return (
            <div>
            <Jumbotron className="Jumbotron">
              <h1>Welcome Back {currentUserObject ? currentUserObject.first_name : null}!</h1>
            </Jumbotron>

            <Summary />
              <CategoryContainer
                transactions={userTransactions}
                userObject={currentUserObject}
              />
            </div>
          )
        }} />
        </Switch>
      </div>
    )
  }
}
