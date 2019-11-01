import React, {Component} from 'react';
import {BrowserRouter as Router, Route,
  Link, Redirect, withRouter, Switch
} from 'react-router-dom'


let auth_signin;
let auth_signout;

const LoginButton = withRouter(({history}) => 
  <button onClick={() => 
    {if(auth_signin()) history.push("/home")}
  }>Login</button> )

const LogoutButton = withRouter(({history}) => 
  <button onClick={() => 
    { auth_signout(); history.push("/");}
  }>Logout</button> )  


const Login = () => {
  
}




















