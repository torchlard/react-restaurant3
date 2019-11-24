import React, {useContext, useEffect, useRef} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Home from './Home';
import { GlobalContext } from '../GlobalContext';
import {ACCOUNT_SYNC, ACCOUNT_SIGNIN, ACCOUNT_SIGNOUT} from '../constants/actionTypes'



export default () => {

  const {state, dispatch} = useContext(GlobalContext)
  const dispatch2 = useRef(dispatch)

  useEffect(() => {
    if(!state.authenticated && state.current.click) window.alert('wrong info')
  }, [state.authenticated])


  const LoginButton = () => <button id="login" onClick={() => dispatch2(ACCOUNT_SIGNIN)}>Login</button>
  const LogoutButton = () => <button id="logout" onClick={() => dispatch2(ACCOUNT_SIGNOUT)}>Logout</button>;


  const Login = () => {
    const triggerLogin = evt => {if(evt.key === 'Enter') document.getElementById("login").click() };
    return (
      <div>
        <h2>Restaurant Management System</h2>
        <label>Username: 
          <input required type="text" value={state.username} id="name" name="username" 
            onChange={evt => dispatch2({type: ACCOUNT_SYNC, data: {type: 'username', payload: evt.target.value}})}
            onKeyPress={ triggerLogin } 
          />
        </label>
        <label>Password:
          <input required type="password" value={state.password} id="password"
            name="password" 
            onChange={evt => dispatch2({type: ACCOUNT_SYNC, data: {type: 'password', payload: evt.target.value}})}
            onKeyPress={ triggerLogin } />
        </label>

        <LoginButton />
      </div>
  
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => state.authenticated ? <Redirect to="/home" /> : <Login /> } />
        <Route path="/" component={LogoutButton} />
        <Route path="/home" render={() => state.authenticated ? <Home /> : <Redirect to="/" /> } />
      </Switch>

    </Router>
  )
}


















