import React, { Component } from 'react';

import Authentication from './Components/Authentication';
import Reservation from './Components/Reservation';

import './styles/styles.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: 'https://api.sportschoolplanner.app',
      auth: false
    }
    this.setAuth = this.setAuth.bind(this);
  }

  setAuth(value) {
    this.setState(value)
  }

  render() {
    let authForm;
    let reservForm;

    if(!this.state.auth) {
       authForm = <Authentication
        url={this.state.url}
        onAuthSubmit={this.setAuth}
      />
    }
    if(this.state.auth) {
      reservForm = <Reservation 
        url={this.state.url}
        id={this.state.id}
        club={this.state.club}
      />
    }

    return (
      <div className='App'>
        {authForm}
        {reservForm}
      </div>
    );
  }
  
}

export default App;
