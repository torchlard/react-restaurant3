import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import LoginEx from './Login'

const App = () => {
  const [account, changeAccount] = useState({role: '', username: '', password: ''})
  const [isAuthenticated, changeAuth] = useState(false)

  const signin = () => {
    if(account.username === 'admin'){
      changeAuth(true); 
      changeAccount({role: 'admin', username: account.username, password:account.password} )
      return true;
    } else if (account.username === 'worker'){
      changeAuth(true); 
      changeAccount({role: 'worker', username: account.username, password:account.password})
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
