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
      categories: ["Auto & Transport", "Bills & Utilities", "Education", "Entertainment", "Food & Dining", "Gifts & Donations", "Health & Fitness", "Miscellaneous", "Shopping", "Travel"]
    }
  }

  fetchTransactions = () => {
    fetch("http://localhost:3001/users/1")
      .then(res => res.json())
      .then(json => (
        this.setState({
          transactions: json
        })
      ))
  }

  componentDidMount() {
    this.fetchTransactions()
  }

  render() {
    return (
      <div>
        <NavBarContainer />
        <Summary />
        <CategoryContainer transactions={this.state.transaction} categories={this.state.categories}/>
      </div>
    )
  }
}
