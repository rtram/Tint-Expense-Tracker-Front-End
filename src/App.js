import React, { Component } from 'react';
import './App.css';
import UserHome from "./HomeView/Containers/UserHome"
import {Route} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://i.imgur.com/SE0k9Wf.png" alt="" />
        </header>
          <Route path='/users/:id' render={props => {
            let userId = props.match.params.id
            return <UserHome userId={userId}/>
          }} />

      </div>
    );
  }
}

export default App;
