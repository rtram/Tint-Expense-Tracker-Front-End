import React, { Component } from 'react';
import './App.css';
import UserHome from "./Containers/UserHome"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <UserHome/>

        </header>
      </div>
    );
  }
}

export default App;
