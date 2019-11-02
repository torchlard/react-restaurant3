import React, {useState, useReducer} from 'react';
// import logo from './logo.svg';
import './App.css';
import LoginEx from './Login'

const reducer = (prevState, newState) => ({...prevState, ...newState})

const App = () => {
  const [account, changeAccount] = useReducer(reducer, 
    {role: '', username: '', password: ''})
  const [isAuthenticated, changeAuth] = useState(false)

  const signin = () => {
    if(account.username === 'admin'){
      changeAuth(true); 
      changeAccount({role: 'admin'} )
      return true;
    } else if (account.username === 'worker'){
      changeAuth(true); 
      changeAccount({role: 'worker'})
      return true
    } else {
      changeAuth(false); 
      changeAccount({role: '', username: '', password: ''})
      return false
    }
  }

  const signout = () => {
    changeAuth(false); 
    changeAccount({role: '', username: '', password: ''})
  }

  return (
    <LoginEx 
      changeAccount={changeAccount} changeAuth={changeAuth}
      signin={signin} signout={signout}
      account={account} isAuthenticated={isAuthenticated}
    />
  )
}

export default App;
