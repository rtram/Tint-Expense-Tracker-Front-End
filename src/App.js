import React, { Component } from 'react';
import './App.css';
import SignIn from "./SignInView/SignIn"
import NavBar from "./NavBar/NavBar"
import UserHome from "./HomeView/Containers/UserHome"
import Footer from "./HomeView/Containers/Footer"
import {Route} from 'react-router-dom'


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

          <Route path='/users/:id' render={props => {
            let userId = props.match.params.id
            return <UserHome userId={userId}/>
          }} />

          <Route exact path='/' render={props => {
            return <SignIn/>
          }} />

        <footer className="App-footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
