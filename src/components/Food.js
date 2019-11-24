import React, {useContext, useEffect, useRef} from 'react'
import {GlobalContext} from '../GlobalContext'
import { FOOD_INIT, FOOD_SETCAT, SUBORDER_ADD } from '../constants/actionTypes'

const Food = () => {

  const {state, dispatch} = useContext(GlobalContext)
  // const dispatch = useRef(_dispatch)

  useEffect(() => dispatch(FOOD_INIT), [])

  return (
    <div>
      <ul style={{listStyleType: 'none' }}>
        {state.categories.map((item,idx) => 
          <li key={idx} style={{float: 'left'}} >
            <button onClick={() => dispatch({type: FOOD_SETCAT, item: item})}>{item}</button>  
          </li>
        )}
      </ul>
      <table>
        <thead><tr>
          <th>Food Name</th>
          <th>Price($)</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr></thead>
        
        <tbody>
          { state.foods
              .filter(i => i.category === state.currentCat)
              .map((item, idx) => (
                <tr key={item.id} 
                  onClick={() => dispatch({type: SUBORDER_ADD, 
                    item: {id:item.id, name:item.name, price:item.price, quantity:1, warning: ''}})}
                  >
                  <td> {item.name} </td>
                  <td> {item.price} </td>
                  <td> {item.quantity} </td>
                  <td> {item.category} </td>
                </tr>
              )) }
        </tbody>
      </table>
    </div>
  )
  
}

export default Food



















