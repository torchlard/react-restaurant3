import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Food from './Food'
// import orderFn from './server/server_order'


const Ordering = props => {

  // const tableInfo = orderFn.getTableOrders(props.masterOrderId)
  /* empty new order list */
  const [orderList, setOrderList] = useState([])

  // save temp orders and go back to order review
  const ToOrderButton = withRouter( ({history}) => 
    <button onClick={() => {
      // in: [{id, maxQty}]
      // out: [{id, name, price, quantity, warning}]
      let invalid_orders = props.addOrders(orderList)
      if(invalid_orders.length == 0){
        history.push("/order");
      } else {
        setOrderList(props.orderList.map(i => {
          const ll = invalid_orders.find(j => j.id === i.id) 
          return ll ? Object.assign(i,{warning: `max ${ll.maxQty}`}) 
                    : Object.assign(i,{warning: ''}) 
        }))
      }
    }}>Confirm</button>
  )

  const addOrder = (id, name, price) => {
    let idx = orderList.findIndex(i => i.id === id)
    if (idx !== -1){
      orderList[idx].quantity += 1;
    } else {
      orderList.push({id: id, name: name, price: price, quantity: 1, warning: ''})
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
            <p>{i.name}</p>

            <span><input type="number" value={i.quantity} 
              style={ (i.warning === '') ? {} : {backgroundColor: '#f00'} }
              onChange={evt => setOrderList(orderList.map(j => j.id === i.id 
                  ? Object.assign(j, {quantity: i.quantity-1}) : j ))
              }
            /></span>

            <span>${i.price*i.quantity}</span>
            
            <button onClick={setOrderList(orderList.filter(j => j.id !== i.id) )}>X</button>

            <span>{i.warning}</span>
          </div>
        ))}

        <p>Total: ${orderList.reduce((i,j) => i.price*i.quantity + j.price*j.quantity, 0) }</p>

        <ToOrderButton />
      </div>

      <Food style={group1} addOrder={addOrder} />

    </div>
  )


}


export default Ordering;










