import React, {useState, useContext, useEffect, useRef} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Home from './Home';
import { GlobalContext } from '../GlobalContext';
import {ACCOUNT_SIGNIN, ACCOUNT_SIGNOUT} from '../constants/actionTypes'



export default () => {

  const {state, dispatch} = useContext(GlobalContext)
  // const dispatch2 = useRef(dispatch)

  useEffect(() => {
    if(!state.authenticated && state.current.click) window.alert('wrong info')
  }, [state.authenticated])

  const Login = () => {
    const [ac, setAc] = useState({username: 'worker', password: '123'})

    return (
      <form onSubmit={() => dispatch({type: ACCOUNT_SIGNIN, data: ac})}>
        <h2>Restaurant Management System</h2>
        <label>Username: 
          <input required type="text" id="name" name="username" value={ac.username}
            onChange={evt => setAc({username: evt.target.value, password: ac.password})}
          />
        </label>
        <label>Password:
          <input required type="password" id="password"
            name="password" value={ac.password}
            onChange={evt => setAc({username: ac.username, password: evt.target.value})}
            />
        </label>

        <input type="submit" value="Login" />
      </form>
  
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => state.authenticated ? <Redirect to="/home" /> : <Login /> } />
        <Route path="/home" render={() => state.authenticated ? <Home /> : <Redirect to="/" /> } />
      </Switch>

    </Router>
  )
}


















