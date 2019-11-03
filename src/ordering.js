import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Food from './food'
import fn from './server/server_order'



const Ordering = props => {
  // save temp orders and go back to order review
  const ToOrderButton = withRouter( ({history}) => 
    <button onClick={() => {
      // out: [{id, foodName, price, quantity, warning}]
      // in: [{id, maxQty}]
      let invalid_orders = updateOrder(final_orders);
      if(invalid_orders.length == 0){
        history.push("/order");
      } else {
        setState(state => ({orderList: props.orderList.map(i => {
          const ll = invalid_orders.find(j => j.id === i.id) 
          return ll ? Object.assign(i,{warning: `max ${ll.maxQty}`}) 
                    : Object.assign(i,{warning: ''}) 
        }) }))
      }
    }}>Confirm</button>
  )

  // constructor(props){
  //   super(props)
  //   state = {
  //     // [{id, foodName, price, quantity, warning}]
  //     orderList: []
  //   }
  //   updateOrder = props.updateOrder
  // }
  const tableInfo = fn.getTableOrders(props.tableId)
  const [orderList, setOrderList] = useState(tableInfo.orders)

  const addOrder = (id, foodName, price) => {
    let idx = orderList.findIndex(i => i.id === id)
    if (idx !== -1){
      orderList[idx].quantity += 1;
    } else {
      orderList.push({id: id, foodName: foodName, price: price, quantity: 1, warning: ''})
    }
    setOrderList(orderList);
  }

  const mainLayout = {
    display: 'flex',
    flexDirection: 'row'
  } 
  const group1 = {
    flexGrow: '1'
  }

  return (
    <div style={mainLayout}>
      <div style={group1}>
        <h3>Order List</h3>    
        <p>Table No: {props.tableNo}</p>

        {orderList.map(i => (
          <div key={i.id}>
            <p>{i.foodName}</p>

            <span><input type="number" value={i.quantity} 
              style={ (i.warning === '') ? {} : {backgroundColor: '#f00'} }
              onChange={evt => setState(state => ({
                orderList: orderList.map(j => j.id === i.id 
                  ? Object.assign(j, {quantity: i.quantity-1}) : j )
              }))
            }/></span>

            <span>${i.price*i.quantity}</span>
            
            <button onClick={setOrderList({orderList.filter(j => j.id !== i.id)} )}>X</button>

            <span>{i.warning}</span>
          </div>
        ))}

        <p>Total: ${orderList.reduce(
          (i,j) => i.price*i.quantity + j.price*j.quantity, 0) }</p>

        <ToOrderButton />
      </div>

      <Food style={group1} addOrder={addOrder} />

    </div>
  )


}


export default Ordering;










