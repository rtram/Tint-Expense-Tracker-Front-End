import React, { Component } from 'react';
import './App.css';
import UserHome from "./HomeView/Containers/UserHome"
import CategoryDetails from "./CategoryView/Containers/CategoryDetails"
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedCategory: null,
      selectedCategoryTransactions: null
    }
  }

  setCategory = (categoryName, categoryTransactions) => {
    this.setState({
      selectedCategory: categoryName,
      selectedCategoryTransactions: categoryTransactions
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Switch >
          <Route path='/category/:id' render={props => {
            let categoryId = props.match.params.id
            return <CategoryDetails />
          }} />


          <Route path='/users/:id' render={props => {
            let userId = props.match.params.id
            return <UserHome userId={userId} setCategory={this.setCategory}/>
          }} />
        </Switch>

        </header>
      </div>
    );
  }
}

export default App;
