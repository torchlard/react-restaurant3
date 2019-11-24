import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Home from './Home';
import { GlobalContext } from '../GlobalContext';
import {ACCOUNT_SYNC, ACCOUNT_SIGNIN, ACCOUNT_SIGNOUT} from '../constants/actionTypes'



export default () => {

  console.log(useContext(GlobalContext))
  const {state, dispatch} = useContext(GlobalContext)
  // const dispatch = useRef(_dispatch)

  useEffect(() => {
    if(!state.authenticated) window.alert('wrong info')
  }, [state.authenticated])


  const Login = () => {
    const triggerLogin = evt => {if(evt.key === 'Enter') document.getElementById("login").click() };
    return (
      <div>
        <h2>Restaurant Management System</h2>
        <label>Username: 
          <input required type="text" value={state.username} id="name" name="username" 
            onChange={evt => dispatch({type: ACCOUNT_SYNC, data: {type: 'username', payload: evt.target.value}})}
            onKeyPress={ triggerLogin } 
          />
        </label>
        <label>Password:
          <input required type="password" value={state.password} id="password"
            name="password" 
            onChange={evt => dispatch({type: ACCOUNT_SYNC, data: {type: 'password', payload: evt.target.value}})}
            onKeyPress={ triggerLogin } />
        </label>
      </div>
  
    )
  }

  const LoginButton = <button id="login" onClick={() => dispatch(ACCOUNT_SIGNIN)}>Login</button>
  const LogoutButton = <button id="logout" onClick={() => dispatch(ACCOUNT_SIGNOUT)}>Logout</button>;


  return (
    <Router>
      <Route exact path="/" render={() => state.authenticated ? <Redirect to="/home" /> : <Login /> } />
      <Route path="/home" render={() => state.authenticated ? <Home /> : <Redirect to="/" /> } />

      <Switch>
        <Route exact path="/" component={LoginButton} />
        <Route path="/" component={LogoutButton} />
      </Switch>

    </Router>
  )
}


















