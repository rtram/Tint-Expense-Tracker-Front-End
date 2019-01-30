import React, { Component } from 'react';
import './App.css';
import SignIn from "./SignInView/SignIn"
import NavBar from "./NavBar/NavBar"
import UserHome from "./HomeView/Containers/UserHome"
import CategoryDetails from "./CategoryView/Containers/CategoryDetails"
import Footer from "./HomeView/Containers/Footer"
import { Route, Switch } from 'react-router-dom'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Route path='/users/:id' render={props => {
          return <NavBar />
        }} />

        <header className="App-header">
          <img src="https://i.imgur.com/SE0k9Wf.png" alt="" />
        </header>

        <Switch>
          <Route exact path='/users/:id/:categoryId' render={props => {
            let categoryId = parseInt(props.match.params.categoryId)
            let userId = props.match.params.id

            return (
              <CategoryDetails
                userId={userId}
                categoryId={categoryId}
                // selectedCategory={selectedCategory}
                // transactions={userCurrentTransactions}
                // userObject={this.props.user}
                // addTransaction={this.addTransaction}
                // handleDelete={this.handleDelete}
                // handleTransactionArrayUpdate={this.handleTransactionArrayUpdate}
                // currentMonth={this.currentMonth()}
              />
            )
          }} />

          <Route path='/users/:id' render={props => {
            let userId = props.match.params.id
            return <UserHome userId={userId}/>
          }} />

          <Route exact path='/' component={SignIn} />
        </Switch>

        <footer className="App-footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
