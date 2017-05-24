
import React, { Component } from 'react';

import Login from './components/Login';
import Chat from './components/Chat';

import './App.css';


class App extends Component {
  render() {

  	const user = window.localStorage.getItem('USER');
  	let loadComponent = <Login />;
  	if (user) {
  		loadComponent = <Chat />;
  	};

    return (
      <div>
      	{loadComponent}
      </div>
    );
  }
}

export default App;
