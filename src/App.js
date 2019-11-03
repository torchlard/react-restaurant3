import React, {useState, useReducer} from 'react';
// import logo from './logo.svg';
import './App.css';
import LoginEx from './Login'

const reducer = (o,n)=>({...o,...n})

const App = () => {
  const [account, changeAccount] = useReducer(reducer, 
    {role: '', username: '', password: ''})
  const [permit, setPermit] = useReducer({edit: false})
  const [isAuthenticated, changeAuth] = useState(false)

  const signin = () => {
    if(account.username === 'admin'){
      changeAuth(true); 
      changeAccount({role: 'admin'})
      setPermit({edit: true})
      return true
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
      permit={permit} setPermit={setPermit}
    />
  )
}

export default App;
