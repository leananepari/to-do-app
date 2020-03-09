import React from 'react';
import './css/styles.css';
import { Route, Switch } from "react-router-dom";
import Dashboard from './components/main/Dashboard';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
