import React, {useState, useReducer, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import LoginEx from './Login'
import orig_food_data from './data/food_data'
import orig_masterOrder from './data/master_order_data'
import orig_order_data from './data/order_data'
import orig_report_data from './data/report_data'
import orig_staff_data from './data/staff_data'
import orig_table_data from './data/table_data'


const reducer = (o,n)=>({...o,...n})

const App = () => {
  useEffect(() => {
    localStorage.setItem(orders, orig_order_data)
    localStorage.setItem(tables, orig_table_data)
    localStorage.setItem(masterOrders, orig_masterOrder)
    localStorage.setItem(foods, orig_food_data)
    localStorage.setItem(reports, orig_report_data)
    localStorage.setItem(staffs, orig_staff_data)
  }, [])

  const [account, changeAccount] = useReducer(reducer, 
    {role: '', username: '', password: ''})
  const [permit, setPermit] = useReducer(reducer, {edit: false})
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
