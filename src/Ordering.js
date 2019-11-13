import React, {useState, useReducer} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Food from './Food'
// import orderFn from './server/server_order'


const Ordering = props => {



  // const tableInfo = orderFn.getTableOrders(props.masterOrderId)
  /* empty new order list */
  const orderListReducer = (state, action) => {
    switch(action.type){
      case 'add':
        // console.log(action.data)
        const idx = action.data.id
        let res = state.find(i => i.id === idx)
        if(res === undefined)
          return state.concat(action.data)
        res.quantity++;
        return state.map(i => i.id === idx ? res : i)
      case 'delete':
        return state.filter(j => j.id !== action.data)
      case 'changeQty':
        const {qty, id} = action.data
        return state.map(j => j.id === id
          ? Object.assign(j, {quantity: Math.max(qty,1) }) : j )
      case 'failed':
        return state.map(i => {
          const ll = props.invalid_orders.find(j => j.id === i.id) 
          return ll ? Object.assign(i,{warning: `max ${ll.maxQty}`}) 
                    : Object.assign(i,{warning: ''}) 
        })
      case 'default':
        return []
    }
  }

  // {id, name, price, quantity, warning}
  const [orderList, dispatch] = useReducer(orderListReducer, [])

  // save temp orders and go back to order review
  const ToOrderButton = withRouter( ({history}) => 
    <button onClick={() => {
      // in: [{id, maxQty}],  out: [{id, name, price, quantity, warning}]
      const flag = props.addOrders(orderList)
      console.log("success: "+props.success)
      if(props.success){
        history.push("/order");
      } else {
        dispatch({type: 'failed'})
      }
    }}>Confirm</button>
  )

  const sums = ll => {
    let data = 0
    for(let i of ll){
      data += i.price*i.quantity
    }
    return data;
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
            <span>{i.name}</span>

            <span><input type="number" value={i.quantity} min={1} 
              style={ (i.warning === '') ? {} : {backgroundColor: '#f00'} }
              onChange={evt => dispatch({type: 'changeQty', data: {id: i.id, qty: evt.target.value}})}
            /></span>

            <span>${i.price}</span>
            
            <button onClick={() => dispatch({type: 'delete', data: i.id}) }>X</button>

            <span>{i.warning}</span>
          </div>
        ))}

        <p>Total: ${ sums(orderList) }</p>

        <ToOrderButton />
      </div>

      <Food style={group1} addOrder={data => dispatch({type: 'add', data: data})} />

    </div>
  )


}


export default Ordering;










