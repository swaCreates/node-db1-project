import React from 'react';
import './App.scss';

import Welcome from '../src/components/Welcome.js';

import {Route, Link, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Budgeting App</h1>
      </header>
      <Welcome />
    </div>
  );
}

export default App;
