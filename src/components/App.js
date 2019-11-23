import React, {useState, useReducer, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import LoginEx from './Login'
import orig_food_data from '../data/food_data'
import orig_masterOrder from '../data/master_order_data'
import orig_order_data from '../data/order_data'
import orig_report_data from '../data/report_data'
import orig_staff_data from '../data/staff_data'
import orig_table_data from '../data/table_data'
import { initState } from '../GlobalContext';
import accountReducer from '../reducers/account'

const combineReducer = (dispatch, state, action, reducers) => 
  reducers.forEach(fn => {
    const res = fn(state, action, dispatch)
    if(res !== undefined) {
      dispatch(res)
    }
  });

const App = () => {

  // run only once to fill data
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orig_order_data))
    localStorage.setItem('tables', JSON.stringify(orig_table_data))
    localStorage.setItem('masterOrders', JSON.stringify(orig_masterOrder))
    localStorage.setItem('foods', JSON.stringify(orig_food_data))
    localStorage.setItem('reports', JSON.stringify(orig_report_data))
    localStorage.setItem('staffs', JSON.stringify(orig_staff_data))
  }, [])

  const [state, dispatch] = useState(initState)

  const props = {
    state: state,
    dispatch: a => combineReducer(dispatch, state, a, 
      [accountReducer] )
  }

  // const [account, changeAccount] = useReducer(reducer, 
  //   {role: 'worker', username: 'worker', password: '123'})
  // const [permit, setPermit] = useReducer(reducer, {edit: false})
  // const [isAuthenticated, changeAuth] = useState(false)

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
    <GlobalContext.Provider value={props}>
      <LoginEx 
        changeAccount={changeAccount} changeAuth={changeAuth}
        signin={signin} signout={signout}
        account={account} isAuthenticated={isAuthenticated}
        permit={permit} setPermit={setPermit}
      />
    </GlobalContext.Provider>

  )
}

export default App;
