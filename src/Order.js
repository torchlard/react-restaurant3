import React, {useState, useEffect, useReducer} from 'react'
import { useParams } from 'react-router'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Ordering from './Ordering'

import orderFn from './server/server_order'
import masterFn from './server/server_masterOrder'
import tableFn from './server/server_table'

const reducer = (p,n) => ({...p,...n})
const orderReducer = (state, action) => {
  switch(action.type){
    case 'add': 
      // send added orders to server
      // {id, maxQty}
      const orders = action.data
      const invalid_orders = orderFn.addOrders(orders)
      if (invalid_orders.length > 0) return {...state, success: false};

      // success, update local order list
      let orderList = state.orders;
      orders.map(i => {
        let idx = orderList.findIndex(j => j.id === i.id);
        if (idx !== -1){
          orderList[idx].ordered_qty += i.quantity;
        } else {
          orderList.push({orderId: i.id, qty: i.quantity, 
            name: i.name, price: i.price})
        }
      })
      return {...state, orders: orderList, success: true};

    case 'delete':
      const orderId = Number(action.data)
      const lists = state.orders.filter(i => i.orderId !== orderId);
      // console.log('orderId: '+orderId)
      // console.log(lists)
      // console.log({...state, orders: lists})
      orderFn.deleteOrder(orderId)
      return {...state, orders: lists}

    default: return state  
  }
}

const Order = props => {

  const tableId = Number(useParams().tableId);
  // console.log("table Id: "+tableId)
  // const tableId = props.match.tableId;
  const masterId = masterFn.getMasterId(tableId)

  const [state, dispatch] = useReducer(orderReducer, {
    // orders: [], 
    // tableId: tableId, 
    // masterOrderId: -1 
    tableNo: '', 
    orders: orderFn.getTableOrders(masterId), 
    tableNo: tableFn.getNoById(tableId),
    masterOrderId: masterId,
    success: false
  })

  // useEffect(() => console.log(state) )
  

  const [status, setStatus] = useState('serving')
  const [money, setMoney] = useReducer(reducer, {paid: 0, change: 0 })

  const sumPrice = () => state.orders.map(i=>i.price).reduce((i,j) => i+j,0);

  // const deleteOrder = orderId => {
  //   const orders = state.orders.filter(i => i.id !== orderId);
  //   // setState({orders: orders})
  //   orderFn.deleteOrder(orderId)
  // }

  // const addOrders = orders => {
  //   // send added orders to server
  //   // {id, maxQty}
  //   const invalid_orders = orderFn.addOrders(orders)
  //   if (invalid_orders.length > 0) return invalid_orders;

  //   // success, update local order list
  //   let orderList = state.orders;
  //   orders.map(i => {
  //     let idx = orderList.findIndex(j => j.id === i.id);
  //     if (idx !== -1){
  //       orderList[idx].ordered_qty += i.quantity;
  //     } else {
  //       orderList.push({orderId: i.id, qty: i.quantity, 
  //         name: i.name, price: i.price})
  //     }
  //   })
  //   // setState({orders: orderList});
  //   return [];
  // }

  return (
    <Router>
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
                  {type:'delete', data: item.orderId})}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total: { sumPrice() }</p>

        <Link to={`/ordering/${state.masterOrderId}`}>New Order</Link>

        {/* <button onClick={() => {
            setStatus("checkout")
            masterFn.checkout(state.masterOrderId)
          }}>Checkout</button>
        <button onClick={()=>{}}>Revert Checkout</button> */}

        {status === 'serving' ? '' :
          <div>
            <p>Customer Paid: {money.paid}</p>
            <p>Change: {money.change}</p>
          </div>
        }
      </div>
      <Route path="/ordering/:id" render={() => <Ordering {...state}
        addOrders={orders => dispatch({type: 'add', data: orders})} /> } /> 
    </Router>
    // <div>nulls</div>
  )
}

export default Order











