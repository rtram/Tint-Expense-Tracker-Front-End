import React, { Component } from "react"
import { connect } from 'react-redux'
import './CategoryDetails.css';
import Transaction from "../Components/Transaction"
import ExpenseForm from "../Components/ExpenseForm"
import {Link} from 'react-router-dom'
import { fetchingTransactions } from '../../redux/actions/transactions.js'
import {Table, Button, Grid, Row, Col} from 'react-bootstrap'

class CategoryDetails extends Component {
  constructor() {
    super()
    this.state={
      categoryNames:["Auto & Transport", "Bills & Utilities", "Education", "Entertainment", "Food & Dining", "Gifts & Donations", "Health & Fitness", "Miscellaneous", "Shopping", "Travel"],
      months: ['January','February','March','April','May','June','July','August','September','October','November','December']
    }
  }

  componentDidMount() {
    this.props.fetchingTransactions(this.props.userId)
  }

  currentMonth = () => {
    let index = new Date().getMonth()
    return this.state.months[index]
  }

  currentMonthTransactions = () => (
    this.props.transactions.filter(transactionObject => {
      let transactionMonth = parseInt(transactionObject.date.split("-")[1])
      let transactionYear = parseInt(transactionObject.date.split("-")[0])
      let currentMonth = new Date().getMonth() + 1
      let currentYear = new Date().getFullYear()

      return (currentMonth === transactionMonth) && (currentYear === transactionYear)
    })
  )

  categoryTransactions = () => {
    let transactions = this.currentMonthTransactions().filter(transactionObject => transactionObject.category.id === this.props.categoryId)

    return transactions
  }

// RETURNS SORTED TRANSACTION - RECENT TO OLDEST
  sortedTransactions = () => {
    let ascendingTransactions;

    ascendingTransactions = this.categoryTransactions().sort((a, b) => new Date(a.date) - new Date (b.date))

    return ascendingTransactions
  }

  categoryTotal = () => {
    let categoryTotal;
    let transactionAmounts = this.categoryTransactions().map(transaction => transaction.amount)

    if (transactionAmounts.length === 0) {
      return categoryTotal = 0
    }

    categoryTotal = this.transactionsReducer(transactionAmounts)
    return categoryTotal
  }

  // TAKES IN ARRAY OF INTEGERS AND RETURNS SUM
  transactionsReducer = (arr) => {
    let reducer = (accumulator, currentValue) => accumulator + currentValue
    let total = arr.reduce(reducer)
    let floatTotal = Math.floor(total * 100) / 100
    return floatTotal
  }

  render() {

    return (
      <div>

      <br/>

      <Grid>
        <Row>
          <Col md={4}/>
          <Col md={4}>
            {this.props.user ?
              <Link to={`/users/${this.props.user.id}/`}>
                <Button bsStyle="primary" block>
                  <strong>Go Back to User Home</strong>
                </Button>
              </Link>: null }
          </Col>
          <Col md={4}/>
        </Row>
      </Grid>

      <br/>
      <br/>

      {this.props.transactions? this.state.categoryNames[this.props.categoryId-1] : null}

      <br/>

      <strong>{this.currentMonth()}</strong>

      <br/>
      <br/>
      <Grid>
        <Row>
          <Col md={2}>
          </Col>

          <Col md={8}>
          <Table bordered condensed hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {this.categoryTotal() > 0 ? this.sortedTransactions().map(transaction => (

                <Transaction key={transaction.id} transactionObject={transaction} handleDelete={this.props.handleDelete} handleTransactionArrayUpdate={this.props.handleTransactionArrayUpdate}/>)) : null
            }
            </tbody>
          </Table>
          </Col>

          <Col md={2}>
          </Col>
        </Row>



        <Row>
          <Col md={2}>
          </Col>
          <Col md={8}>
          <ExpenseForm
            selectedCategory={this.props.selectedCategory} transactions={this.props.transactions}
            userObject={this.props.userObject}
            addTransaction={this.props.addTransaction}
          />
          </Col>
          <Col md={2}>
          </Col>
        </Row>

        <Row>
          <Col md={2}>
          </Col>
          <Col md={8}>
          <Table bordered condensed hover>
            <thead>
              {this.props.selectedCategory ? <th>{this.props.selectedCategory.name}</th>: null }
              <th>Total</th>
              <th>${Number.isInteger(this.categoryTotal()) ? this.categoryTotal() + ".00" : this.categoryTotal()}</th>
            </thead>
          </Table>
          </Col>
          <Col md={2}>
          </Col>
        </Row>

        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    transactions: state.transactions
  }
}

export default connect(mapStateToProps, { fetchingTransactions })(CategoryDetails)
