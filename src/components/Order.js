import React, {useRef,useEffect, useContext} from 'react'
import { useParams } from 'react-router'
import {Link } from 'react-router-dom'
import {GlobalContext} from '../GlobalContext'

import { ORDER_INIT, ORDER_DELETE } from '../constants/actionTypes'


const Order = () => {

  const {state, dispatch} = useContext(GlobalContext)
  // const dispatch = useRef(_dispatch)
  const tableId = useRef(Number(useParams().tableId))
  useEffect(() => {
    dispatch({type: ORDER_INIT, tableId: tableId})
  }, [])

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
              <td>{item.name}</td>
              <td>{item.orderQty}</td>
              <td>{item.arriveQty}</td>
              <td>{item.price}</td>
              <td><button onClick={() => dispatch(
                {type:ORDER_DELETE, data: item.id})}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: ${ sumPrice() }</p>

      <Link to={`/suborder`}>New Order</Link>

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

      {/* {state.current.suborder && <Suborder /> } */}
  {/* <Route path="/ordering/:id" render={() => <Ordering addOrders={orders => {dispatch({type: ORDER_ADD, data: orders}); return state.success}} /> } />  */}


    </div>

      

  )
}

export default Order











