import React, { Component } from "react"
import './CategoryDetails.css';
import Transaction from "../Components/Transaction"
import ExpenseForm from "../Components/ExpenseForm"
import {Link} from 'react-router-dom'
import {Table, Button, Grid, Row, Col} from 'react-bootstrap'

export default class CategoryDetails extends Component {

  render() {
    let categoryTotal;

    if (this.props.transactions) {
      categoryTotal = this.props.transactions.map(transaction => transaction.amount)

      if (categoryTotal.length > 0) {
        let reducer = (accumulator, currentValue) => accumulator + currentValue
        categoryTotal = categoryTotal.reduce(reducer)
        categoryTotal = Math.floor(categoryTotal * 100) / 100
      }
    }

// SORT BY RECENT TO OLDEST
    let ascendingTransactions;
    if (this.props.transactions) {
      ascendingTransactions = this.props.transactions.sort((a, b) => new Date(a.date) - new Date (b.date))
    }

    return (
      <div>

      <br/>

      <Grid>
        <Row>
          <Col md={4}/>
          <Col md={4}>
            {this.props.userObject ?
              <Link to={`/users/${this.props.userObject.id}/`}>
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

      {this.props.transactions? this.props.selectedCategory.name : null}

      <br/>

      <strong>{this.props.currentMonth}</strong>

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
            {categoryTotal > 0 ? ascendingTransactions.map(transaction => (

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
              <th>${Number.isInteger(categoryTotal) ? categoryTotal + ".00" : categoryTotal}</th>
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
