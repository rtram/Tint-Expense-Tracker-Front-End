import React, { Component } from "react"
import Summary from "./Summary"
import CategoryContainer from "./CategoryContainer"
import CategoryDetails from "../../CategoryView/Containers/CategoryDetails"
import UserHomeChart from "../Components/UserHomeChart.js"
import {Route, Switch} from 'react-router-dom'
import {Jumbotron, Carousel} from "react-bootstrap"

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

// FILTERS CURRENT MONTH TRANSACTIONS ==========================================
        let currentMonthTransactions = json.transactions.filter(transactionObject => {
          let transactionMonthInt = parseInt(transactionObject.date.split("-")[1])
          let transactionYearInt = parseInt(transactionObject.date.split("-")[0])
          let presentMonth = new Date().getMonth() + 1
          let presentYear = new Date().getFullYear()

          return (presentMonth === transactionMonthInt) && (presentYear === transactionYearInt)
        })

        this.setState({
          transactions: json.transactions,
          currentMonthTransactions: currentMonthTransactions
        })
// =============================================================================

        let threeMonthData = []
        let currentMonth;
        let lastMonth;
        let lastLastMonth;


        // CURRENT MONTH TOTAL
        if (this.state.transactions) {
          let currentMonthTransactions = this.state.transactions.filter(transactionObject => {
            let transactionMonthInt = parseInt(transactionObject.date.split("-")[1])
            let transactionYearInt = parseInt(transactionObject.date.split("-")[0])
            let currentMonth = new Date().getMonth() + 1
            let presentYear = new Date().getFullYear()
            return (currentMonth === transactionMonthInt) && (presentYear === transactionYearInt)
          })
          let currentMonthTransactionsAmt = currentMonthTransactions.map(transaction => transaction.amount)

          let reducer = (accumulator, currentValue) => accumulator + currentValue
          currentMonth = currentMonthTransactionsAmt.reduce(reducer)
          currentMonth = Math.floor(currentMonth * 100) / 100
        }

        // LAST MONTH TOTAL
        if (this.state.transactions) {
          let lastMonthTransactions = this.state.transactions.filter(transactionObject => {
            let transactionMonthInt = parseInt(transactionObject.date.split("-")[1])
            let transactionYearInt = parseInt(transactionObject.date.split("-")[0])
            let lastMonth = new Date().getMonth()
            let presentYear = new Date().getFullYear()
            return (lastMonth === transactionMonthInt) && (presentYear === transactionYearInt)
          })
          let lastMonthTransactionsAmt = lastMonthTransactions.map(transaction => transaction.amount)

          if (lastMonthTransactionsAmt.length > 0) {
            let reducer = (accumulator, currentValue) => accumulator + currentValue
            lastMonth = lastMonthTransactionsAmt.reduce(reducer)
            lastMonth = Math.floor(lastMonth * 100) / 100
          } else {
            lastMonth = 0.00
          }

        }

        // LAST LAST MONTH TOTAL
        if (this.state.transactions) {
          let lastLastMonthTransactions = this.state.transactions.filter(transactionObject => {
            let transactionMonthInt = parseInt(transactionObject.date.split("-")[1])
            let transactionYearInt = parseInt(transactionObject.date.split("-")[0])
            let lastLastMonth = new Date().getMonth() - 1
            let presentYear = new Date().getFullYear()
            return (lastLastMonth === transactionMonthInt) && (presentYear === transactionYearInt)
          })
          let lastLastMonthTransactionsAmt = lastLastMonthTransactions.map(transaction => transaction.amount)

          if (lastLastMonthTransactionsAmt.length > 0) {
            let reducer = (accumulator, currentValue) => accumulator + currentValue
            lastLastMonth = lastLastMonthTransactionsAmt.reduce(reducer)
            lastLastMonth = Math.floor(lastLastMonth * 100) / 100
          } else (
            lastLastMonth = 0.00
          )
        }

        threeMonthData = [lastLastMonth, lastMonth, currentMonth]

        this.setState({
          threeMonthData: threeMonthData
        })

      })
  }

  addTransaction = (transactionObject) => {
    let allTransactions = [...this.state.transactions, transactionObject]

// FILTERS CURRENT MONTH TRANSACTIONS ==========================================
    let currentMonthTransactions = allTransactions.filter(transactionObject => {
      let transactionMonthInt = parseInt(transactionObject.date.split("-")[1])
      let transactionYearInt = parseInt(transactionObject.date.split("-")[0])
      let presentMonth = new Date().getMonth() + 1
      let presentYear = new Date().getFullYear()
      return (presentMonth === transactionMonthInt) && (presentYear === transactionYearInt)
    })
// =============================================================================
    this.setState({
      transactions: allTransactions,
      currentMonthTransactions: currentMonthTransactions
    })
  }

  handleDelete = (transactionObject) => {
    fetch(`http://localhost:3001/transactions/${transactionObject.id}`, {
      method: "DELETE"
    })

    // DELETING FROM THIS.STATE.TRANSACTIONS
    let copyOfAllTransactions = [...this.state.transactions]
    let indexOfAllTransactions = this.state.transactions.indexOf(transactionObject)
    copyOfAllTransactions.splice(indexOfAllTransactions, 1)
    this.setState({
      transactions: copyOfAllTransactions
    })

    // DELETING FROM THIS.STATE.CURRENTMONTHTRANSACTIONS
    let copyOfCurrentMonthTransactions = [...this.state.currentMonthTransactions]
    let indexOfCurrentMonthTransactions = this.state.currentMonthTransactions.indexOf(transactionObject)
    copyOfCurrentMonthTransactions.splice(indexOfCurrentMonthTransactions, 1)
    this.setState({
      currentMonthTransactions: copyOfCurrentMonthTransactions
    })


  }

  handleTransactionArrayUpdate = (updateObject, transactionObject) => {
    let copyOfTransactions = [...this.state.transactions]
    let index = copyOfTransactions.indexOf(transactionObject)
    copyOfTransactions.splice(index, 1, updateObject)

// FILTERS CURRENT MONTH TRANSACTIONS ==========================================
    let currentMonthTransactions = copyOfTransactions.filter(transactionObject => {
      let transactionMonthInt = parseInt(transactionObject.date.split("-")[1])
      let transactionYearInt = parseInt(transactionObject.date.split("-")[0])
      let presentMonth = new Date().getMonth() + 1
      let presentYear = new Date().getFullYear()
      return (presentMonth === transactionMonthInt) && (presentYear === transactionYearInt)
    })
// =============================================================================

    this.setState({
      transactions: copyOfTransactions,
      currentMonthTransactions: currentMonthTransactions
    })
  }

  render() {

//GET CURRENT MONTH=============================================================
    let months    =['January','February','March','April','May','June','July','August','September','October','November','December']

    let currentMonthGetter = () => {
      let index = new Date().getMonth()
      return months[index]
    }

    let currentMonth = currentMonthGetter()

//CHART METHODS=================================================================
    let labelGetter = () => {
      let lastThreeMonths = []
      let index = new Date().getMonth()
      lastThreeMonths.push(months[index-2])
      lastThreeMonths.push(months[index-1])
      lastThreeMonths.push(months[index])
      return lastThreeMonths
    }

//==============================================================================

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

            <Carousel className="Carousel">
              <Carousel.Item>
                <h2>Tip #1</h2>
                <p id="smaller-font" >Check your credit score</p>
                <p id="smaller-font1" >Your credit score is a numeric representation of your credit that informs lenders about what kind of borrower you are.</p>
                <br/>
                <br/>
              </Carousel.Item>
              <Carousel.Item>
                <h2>Tip #2</h2>
                <p id="smaller-font">Pay more than the minimum on your credit card</p>
                <p id="smaller-font1">When it comes to paying your credit card, settling for the bare minimum makes you a slave to interest.</p>
                <br/>
                <br/>
              </Carousel.Item>
              <Carousel.Item>
                <h2>Tip #3</h2>
                <p id="smaller-font">Up your retirement contribution</p>
                <p id="smaller-font1">Compound interest can become your best friend if you start saving now.</p>
                <br/>
                <br/>
              </Carousel.Item>
              <Carousel.Item>
                <h2>Tip #4</h2>
                <p id="smaller-font">Sign up for autopay on your debt</p>
                <p id="smaller-font1">Missing a payment can hurt your credit score and tack on unnecessary late fees.</p>
                <br/>
                <br/>
              </Carousel.Item>

            </Carousel>

            <br/>
            <br/>

            <Summary
              transactions={this.state.currentMonthTransactions}
              currentMonth={currentMonth}
            />
            <UserHomeChart
              label={labelGetter()}
              data={this.state.threeMonthData}
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
