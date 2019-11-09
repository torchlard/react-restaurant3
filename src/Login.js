import React from 'react';
import {BrowserRouter as Router, Route,Link, Redirect, withRouter, Switch} from 'react-router-dom'
import Home from './Home';


const Login = (props) => {

  const triggerLogin = evt => {if(evt.key === 'Enter') document.getElementById("login").click() };
  
  return (
    <div>
      <h2>Restaurant Management System</h2>
      <label>Username: 
        <input required type="text" value={props.username} id="name"
          name="username" onChange={evt => props.changeAccount({
            username: evt.target.value}) }  onKeyPress={ triggerLogin } />
      </label>
      <label>Password:
        <input required type="password" value={props.password} id="password"
          name="password" onChange={evt => props.changeAccount({password:evt.target.value }) } 
            onKeyPress={ triggerLogin } />
      </label>
    </div>

  )
}

const LoginEx = (props) => {
  const LoginButton = withRouter( ({history}) =>
    <button id="login" onClick={() => {
      if(props.signin()) history.push("/home") 
      else { window.alert('wrong info'); 
        document.getElementById("name").value = ""
        document.getElementById("password").value = ""
      }
    }}>Login</button>);

  // const LoginButton = () => <Link to="/home" onClick={() => {
  //   if(!props.signin()){
  //     document.getElementById("name").value = ""
  //     document.getElementById("password").value = ""
  //     window.alert('wrong info'); 
  //   }}} >Login</Link>

  const LogoutButton = withRouter( ({history}) =>
    <button id="logout" onClick={() => { props.signout(); history.push("/") }}>Logout</button>);

  // const LogoutButton = () => <Link to="/" onClick={props.signout()} >Logout</Link>

  return (
    <Router>
      <Route exact path="/" render={() => <Login {...props} />} />

      <Switch>
        <Route exact path="/" render={() => <LoginButton /> } />
        <Route path="/" render={() => <LogoutButton {...props} />} />
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

















