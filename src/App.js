import React from 'react';
import './css/styles.css';
import { Route, Switch } from "react-router-dom";
import Dashboard from './components/main/Dashboard';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import Profile from './components/main/Profile';
import Settings from './components/main/Settings';
import PrivateRoute from './components/authentication/PrivateRoute';

function App() {
  return (
    <>
      <Switch>
        <PrivateRoute exact path='/' component={Dashboard} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/settings' component={Settings} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
      </Switch>
    </>
  );
}

export default App;
