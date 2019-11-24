import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Suborder from './Suborder'
import GlobalContext from '../GlobalContext'

import masterFn from '../server/server_masterOrder'
import { ORDER_INIT, ORDER_DELETE, ORDER_ADD, SUBORDER_TOGGLE } from '../constants/actionTypes'


const Order = () => {

  const tableId = Number(useParams().tableId);
  const masterId = masterFn.getMasterId(tableId)

  useEffect(() => {
    dispatch({type: ORDER_INIT, tableId: tableId, masterId: masterId })
  }, [])

  const [state, dispatch] = useContext(GlobalContext)
  const sumPrice = () => state.orders.map(i=>i.price).reduce((i,j) => i+j,0);

  return (
    <div>
      <p>Table No: {state.tableNo}</p>
      <table>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Ordered Qty</th>
            <th>Arrived Qty</th>
            <th>Price($)</th>
          </tr>
        </thead>

        <tbody>
          {state.orders.map((item, idx) => (
            <tr key={idx}>
              <td>{item.foodName}</td>
              <td>{item.ordered_qty}</td>
              <td>{item.arrived_qty}</td>
              <td>{item.price}</td>
              <td><button onClick={() => dispatch(
                {type:ORDER_DELETE, data: item.orderId})}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: ${ sumPrice() }</p>

      {/* <button onClick={dispatch({type: SUBORDER_TOGGLE, data: true})}>New Order</button> */}
      <Link to={`/suborder/${state.masterOrderId}`}>New Order</Link>

      {/* <button onClick={() => {
          setStatus("checkout")
          masterFn.checkout(state.masterOrderId)
        }}>Checkout</button>
      <button onClick={()=>{}}>Revert Checkout</button> */}

      {state.current.status !== 'serving' &&
        <div>
          <p>Customer Paid: {state.current.paid}</p>
          <p>Change: {state.current.change}</p>
        </div>
      }

      {state.current.suborder && <Suborder /> }
  {/* <Route path="/ordering/:id" render={() => <Ordering addOrders={orders => {dispatch({type: ORDER_ADD, data: orders}); return state.success}} /> } />  */}


    </div>

      

  )
}

export default Order











