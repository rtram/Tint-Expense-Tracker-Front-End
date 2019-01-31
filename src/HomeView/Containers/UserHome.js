import React, { Component } from "react"
import Summary from "./Summary"
import CategoryContainer from "./CategoryContainer"
import LineGraph from "../Components/LineGraph.js"
import { connect } from 'react-redux'
import { fetchingTransactions } from '../../redux/actions/transactions.js'
import WelcomeJumbotron from '../WelcomeJumbotron.js'
import TipsCarousel from '../TipsCarousel.js'

class UserHome extends Component {
  constructor() {
    super()
    this.state={
      months: ['January','February','March','April','May','June','July','August','September','October','November','December']
    }
  }

  componentDidMount() {
    this.props.fetchingTransactions(this.props.userId)
  }

  filterCurrentMonthTransactions = () => (
    this.props.transactions.filter(transactionObject => {
      let transactionMonth = parseInt(transactionObject.date.split("-")[1])
      let transactionYear = parseInt(transactionObject.date.split("-")[0])
      let currentMonth = new Date().getMonth() + 1
      let currentYear = new Date().getFullYear()

      return (currentMonth === transactionMonth) && (currentYear === transactionYear)
    })
  )

  filterLastMonthTransactions = () => (
    this.props.transactions.filter(transactionObject => {
      let transactionMonth = parseInt(transactionObject.date.split("-")[1])
      let transactionYear = parseInt(transactionObject.date.split("-")[0])
      let currentMonth = new Date().getMonth() + 1

      if (currentMonth === 1) {
        let lastMonth = 12
        let year = new Date().getFullYear() - 1
        return (lastMonth === transactionMonth) && (year === transactionYear)
      } else {
        let lastMonth = new Date().getMonth()
        let presentYear = new Date().getFullYear()
        return (lastMonth === transactionMonth) && (presentYear === transactionYear)
      }
    })
  )

  filterLastLastMonthTransactions = () => (
    this.props.transactions.filter(transactionObject => {
      let transactionMonthInt = parseInt(transactionObject.date.split("-")[1])
      let transactionYearInt = parseInt(transactionObject.date.split("-")[0])
      let currentMonth = new Date().getMonth() + 1

      if (currentMonth === 1) {
        let lastLastMonth = 11
        let year = new Date().getFullYear() - 1
        return (lastLastMonth === transactionMonthInt) && (year === transactionYearInt)
      } else {
        let lastLastMonth = new Date().getMonth() - 1
        let presentYear = new Date().getFullYear()
        return (lastLastMonth === transactionMonthInt) && (presentYear === transactionYearInt)
      }
    })
  )

  // TAKES IN ARRAY OF INTEGERS AND RETURNS SUM
  transactionsReducer = (arr) => {
    let reducer = (accumulator, currentValue) => accumulator + currentValue
    let total = arr.reduce(reducer)
    let floatTotal = Math.floor(total * 100) / 100
    return floatTotal
  }

  // TAKES IN ARRAY OF TRANSACTION OBJECTS RETURNS SUM TOTAL
  calculateTotal = (array) => {
    let monthTotal;
    let monthTransactionsAmt = array.map(transaction => transaction.amount)

    if (!monthTransactionsAmt.length > 0) {
      monthTotal = 0.00
    } else {
      monthTotal = this.transactionsReducer(monthTransactionsAmt)
    }
    return monthTotal
  }

  threeMonthData = () => {
    let threeMonthData = []
    let currentMonthTotal;
    let lastMonthTotal;
    let lastLastMonthTotal;

    currentMonthTotal = this.calculateTotal(this.filterCurrentMonthTransactions())

    lastMonthTotal = this.calculateTotal(this.filterLastMonthTransactions())

    lastLastMonthTotal = this.calculateTotal(this.filterLastLastMonthTransactions())

    threeMonthData = [lastLastMonthTotal, lastMonthTotal, currentMonthTotal]

    return threeMonthData
  }

  currentMonth = () => {
    let index = new Date().getMonth()
    return this.state.months[index]
  }

  lineGraphLabels = () => {
    let lastThreeMonths = []
    let index = new Date().getMonth()
    if (index === 0) {
      lastThreeMonths.push(this.state.months[10])
      lastThreeMonths.push(this.state.months[11])
      lastThreeMonths.push(this.state.months[index])
    } else if (index === 1) {
      lastThreeMonths.push(this.state.months[11])
      lastThreeMonths.push(this.state.months[0])
      lastThreeMonths.push(this.state.months[index])
    } else {
      lastThreeMonths.push(this.state.months[index-2])
      lastThreeMonths.push(this.state.months[index-1])
      lastThreeMonths.push(this.state.months[index])
    }
    return lastThreeMonths
  }

  render() {


    return (
      <div>
        <WelcomeJumbotron />
        <TipsCarousel />

        <Summary
          transactions={this.filterCurrentMonthTransactions()}
          currentMonth={this.currentMonth()}
        />
        <LineGraph
          label={this.lineGraphLabels()}
          data={this.threeMonthData()}
        />
        <CategoryContainer
          transactions={this.filterCurrentMonthTransactions()}
          userObject={this.props.user}
          currentMonth={this.currentMonth()}
        />
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

export default connect(mapStateToProps, { fetchingTransactions })(UserHome);
