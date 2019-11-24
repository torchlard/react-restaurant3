import React, {useState, useReducer, useEffect} from 'react';
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
import GlobalContext from '../GlobalContext'

const combineReducer = (dispatch, state, action, reducers) => {
    const data = (typeof action === "string") ? {type: action} : action
    reducers.forEach(fn => {
      const res = fn(state, data, dispatch)
      if(res !== undefined) {
        dispatch(res)
      }
    });
  }

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

  return (
    <GlobalContext.Provider value={props}>
      <LoginEx />
    </GlobalContext.Provider>

  )
}

export default App;
