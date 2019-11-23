import React, {useContext} from 'react';
import {BrowserRouter as Router, Route,Link, Redirect, withRouter, Switch} from 'react-router-dom'
import Home from './Home';
import { GlobalContext } from '../GlobalContext';
import {ACCOUNT_SYNC} from '../constants/actionTypes'


const Login = (props) => {

  const [state, dispatch] = useContext(GlobalContext)
  const triggerLogin = evt => {if(evt.key === 'Enter') document.getElementById("login").click() };
  
  return (
    <div>
      <h2>Restaurant Management System</h2>
      <label>Username: 
        <input required type="text" value={props.username} id="name" name="username" 
          onChange={evt => dispatch({type: ACCOUNT_SYNC, data: {type: 'username', payload: evt.target.value}})}
          onKeyPress={ triggerLogin } 
          // onChange={evt => props.changeAccount({username: evt.target.value}) } 
        />
      </label>
      <label>Password:
        <input required type="password" value={props.password} id="password"
          name="password" 
          // onChange={evt => props.changeAccount({password:evt.target.value }) } 
          onChange={evt => dispatch({type: ACCOUNT_SYNC, data: {type: 'password', payload: evt.target.value}})}
          onKeyPress={ triggerLogin } />
      </label>
    </div>

  )
}

const LoginEx = (props) => {
  // const LoginButton = withRouter( ({history}) =>
  //   <button id="login" onClick={() => {
  //     if(props.signin()) history.push("/home") 
  //     else { window.alert('wrong info'); 
  //       document.getElementById("name").value = ""
  //       document.getElementById("password").value = ""
  //     }
  //   }}>Login</button>);

  const LoginButton = <button onClick={() => } >Login</button>

  const LogoutButton = withRouter( ({history}) =>
    <button id="logout" onClick={() => { props.signout(); history.push("/") }}>Logout</button>);

  // const LogoutButton = () => <Link to="/" onClick={props.signout()} >Logout</Link>

  return (
    <Router>
      <Route exact path="/" render={() => state.authenticated ? <Home /> : <Login /> } />

      <Switch>
        <Route exact path="/" render={() => <LoginButton /> } />
        <Route path="/" render={() => <LogoutButton />} />
      </Switch>

      <Route path="/home" render={() => 
        props.isAuthenticated ? <Home {...props} /> : <Redirect to="/" /> } />
    </Router>
  )
}

// const LoginEx = props => {
//   const routes = {
//     "/"
//   }
// }

export default LoginEx

















