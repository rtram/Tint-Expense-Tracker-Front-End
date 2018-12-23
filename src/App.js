import React, { Component } from 'react';
import './App.css';
import UserHome from "./HomeView/Containers/UserHome"
import NavBarContainer from "./HomeView/Containers/NavBarContainer"
import {Route} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <NavBarContainer />
          <Route path='/users/:id' render={props => {
            let userId = props.match.params.id
            return <UserHome userId={userId}/>
          }} />
        </header>
      </div>
    );
  }
}

export default App;
