import React, {useContext, useEffect, useRef} from 'react'
import {Redirect} from 'react-router-dom'
import Food from './Food'
import { SUBORDER_CHANGEQTY, SUBORDER_DELETE, ORDER_ADD, SUBORDER_INIT } from '../constants/actionTypes'
import {GlobalContext} from '../GlobalContext'

export default () => {
  const {state, dispatch} = useContext(GlobalContext)
  // const dispatch = useRef(_dispatch)

  useEffect(() => dispatch(SUBORDER_INIT), [])

  // const sums = ll => {
  //   let data = 0
  //   for(let i of ll){
  //     data += i.price*i.quantity
  //   }
  //   return data;
  // }
  const sums = () => state.suborders.map(i=>i.price*i.quantity).reduce((i,j)=>i+j,0)

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
        <p>Table No: {state.tableNo}</p>

        {state.suborders.map(i => (
          <div key={i.id}>
            <span>{i.name}</span>

            <span><input type="number" value={i.quantity} min={1} 
              style={ i.warning !== '' && {backgroundColor: '#f00'} }
              onChange={evt => dispatch({type: SUBORDER_CHANGEQTY, 
                id: i.id, qty: evt.target.value })}
            /></span>

            <span>${i.price}</span>
            
            <button onClick={() => dispatch({type: SUBORDER_DELETE, id: i.id}) }>X</button>

            <span>{i.warning}</span>
          </div>
        ))}

        <p>Total: ${ sums() }</p>

        <button onClick={() => dispatch(ORDER_ADD)}>Confirm</button>
      </div>

      <Food style={group1} />
      
      {!state.current.suborder && <Redirect to={`/order/${state.tableId}`} /> }

    </div>
  )

}










