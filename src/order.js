import React, {useState, useEffect, useReducer} from 'react'
import {Link} from 'react-router-dom'
import fn from './server/server_order'


const reducer = (p,n) => ({...p,...n})
const Order = props => {

  const [state, setState] = useReducer(reduer, {
    orders: [], tableId: props.tableId, tableNo: '', masterOrderId: -1})
  const [money, setMoney] = useReducer(reduer, {
    status: "serving", paid: 0, change: 0 })

  const sumPrice = () => state.orders.map(i=>i.price).reduce((i,j) => i+j,0);

  useEffect(() => {
    const {masterOrderId, orders, tableNo} = fn.getTableOrders(state.tableId);
    setState({ orders: orders, masterOrderId: masterOrderId, tableNo: tableNo })
  })

  const deleteOrder = orderId => {
    const orders = state.orders.filter(i => i.id != orderId);
    setState({orders: orders})
    fn.deleteOrder(orderId)
  }

  const updateOrder = orders => {
    // send added orders to server
    // {id, maxQty}
    const invalid_orders = fn.addOrders(orders)
    if (invalid_orders.length > 0) return invalid_orders;

    // success, update local order list
    let orderList = state.orderList;
    orders.map(i => {
      let idx = orderList.findIndex(j => j.id === i.id);
      if (idx !== -1){
        orderList[idx].ordered_qty += i.quantity;
      } else {
        orderList.push({orderId: i.id, qty: i.quantity, 
          foodName: i.foodName, price: i.price})
      }
    })
    setState({orderList: orderList});
    return [];
  }

  return (
    <div>
      <p>Table No: {this.state.tableNo}</p>
      <table>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>ORdered Qty</th>
            <th>Arrived Qty</th>
            <th>Price($)</th>
          </tr>
        </thead>

        <tbody>
          {this.state.orders.map((item, idx) => (
            <tr key={item.id}>
              <td>{item.foodName}</td>
              <td>{item.ordered_qty}</td>
              <td>{item.arrived_qty}</td>
              <td>{item.price}</td>
              <button onClick={this.deleteOrder(item.id,idx)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: { sumPrice() }</p>

      <Link to={`/ordering/${this.state.masterOrderId}`}>New Order</Link>

      <button onClick={() => {
          this.setState({status: "checkout"})
          fn.checkout(this.state.masterOrderId)
        }}>Checkout</button>
      <button onClick={}>Revert Checkout</button>

      
      {
        this.state.status === 'serving' ? '' :
        <div>
          <p>Customer Paid: {this.state.paid}</p>
          <p>Change: {this.state.change}</p>
        </div>
      }
    </div>
  )
}

// class OrderEx extends PureComponent {
//   constructor(props){
//     this.state = {
//       tableId: props.match.params.tableId,
//     }
//   }
// }

export default Order











