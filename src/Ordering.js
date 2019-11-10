import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Food from './Food'
// import orderFn from './server/server_order'


const Ordering = props => {

  // const tableInfo = orderFn.getTableOrders(props.masterOrderId)
  /* empty new order list */
  const orderListReducer = (state, action) => {
    switch(action.type){
      case 'add':
        console.log(action.data)
        return state.concat(action.data)
      case 'delete':
        return state.filter(j => j.id !== action.data)
      case 'changeQty':
        const {qty, id} = action.data
        return state.map(j => j.id === id
          ? Object.assign(j, {quantity: qty}) : j )
      case 'default':
        return []
    }
  }

  const [orderList, dispatch] = useReducer(orderListReducer, [])

  // save temp orders and go back to order review
  const ToOrderButton = withRouter( ({history}) => 
    <button onClick={() => {
      // in: [{id, maxQty}]
      // out: [{id, name, price, quantity, warning}]
      props.addOrders(orderList)
      if(!props.success){
        history.push("/order");
      } else {
        // setOrderList(props.orderList.map(i => {
        //   const ll = invalid_orders.find(j => j.id === i.id) 
        //   return ll ? Object.assign(i,{warning: `max ${ll.maxQty}`}) 
        //             : Object.assign(i,{warning: ''}) 
        // }))
      }
    }}>Confirm</button>
  )

  // const addOrder = (id, name, price) => {
  //   console.log("addOrder",id,name,price)
  //   // let idx = orderList.findIndex(i => i.id === id)
  //   // console.log(idx)
  //   // if (idx !== -1){
  //   //   orderList[idx].quantity += 1;
  //   // } else {
  //   //   orderList.push({id: id, name: name, price: price, quantity: 1, warning: ''})
  //   // }
  //   // console.log(orderList)
  //   setOrderList(orderList.concat({id: id, name: name, price: price, quantity: 1, warning: ''}));
  // }

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
              onChange={evt => dispatch({type: 'changeQty', data: {id: i.id, qty: evt.target.value}})}
            /></span>

            <span>${i.price*i.quantity}</span>
            
            <button onClick={() => dispatch({type: 'delete', data: i.id}) }>X</button>

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










