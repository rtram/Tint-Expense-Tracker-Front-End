import React, { Component } from "react"
import Summary from "./Summary"
import CategoryContainer from "./CategoryContainer"
import NavBarContainer from "./NavBarContainer"

export default class UserHome extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: null,
      transactions: null,
      categories: ["Auto & Transport", "Bills & Utilities", "Education", "Entertainment", "Food & Dining", "Gifts & Donations", "Health & Fitness", "Miscellaneous", "Shopping", "Travel"],
      selectedCategory: null
    }
  }

  fetchTransactions = () => {
    fetch(`http://localhost:3001/users/${this.props.userId}`)
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


  render() {
    return (
      <div>
        <NavBarContainer />
        <Summary />
        <CategoryContainer
        transactions={this.state.transactions} categories={this.state.categories}
        setCategory={this.props.setCategory}
        />
      </div>
    )
  }
}
