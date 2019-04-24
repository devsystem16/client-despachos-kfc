import React, { Component } from 'react';
import Router from './Components/Router'
import './index.css'

class App extends Component {
  render() {
    return ( 
      <Router counter="1"></Router>
    );
  }
}

export default App;
