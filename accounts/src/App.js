import React from 'react';
import './App.scss';

import Welcome from '../src/components/Welcome.js';
import UsersAccountFeed from '../src/components/UsersAccountFeed.js';
import AddAcount from '../src/components/AddAccount.js';

import fakeAuth from './auth.js'

import PrivateRoute from '../src/components/PrivateRoute.js';

import {Route, Switch, withRouter} from 'react-router-dom';

// using state to say if logged in display this, else display that
const AuthButton= withRouter(({history}) => (
  fakeAuth.isAuthenticated === true ? <p className='welcome-login'>Welcome! <div className='signout'><button onClick={() => {
    fakeAuth.logout(() => {
      history.push('/');
    })
  }}>sign out</button></div></p>
  : <p className='warning'>You are not logged in.</p>
)) 

function App() {

  return (
    <div className="App">
      <header className="App-header">
       <h1>Budgeting App</h1>
      </header>
      <AuthButton />
      <Switch>
        <Route 
          exact path='/'
          component={Welcome}
        />
        <PrivateRoute 
          path='/users-account' 
          component={UsersAccountFeed}
        />
        <PrivateRoute 
          path='/add-account' 
          component={AddAcount}
        />
        <Route
          exact path='*'
          component={() => <h3>404 Page Not Found</h3>} // a trick to say if this route is not supported display 404
        />
      </Switch>
    </div>
  );
}

export default App;
