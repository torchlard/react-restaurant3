import { SUBORDER_ADD, SUBORDER_DELETE, SUBORDER_CHANGEQTY, SUBORDER_FAILED, SUBORDER_TOGGLE, SUBORDER_INIT } from '../constants/actionTypes'
import orderFn from '../server/server_table'
import foodFn from '../server/server_food'

export default (state, action, dispatch) => {
  switch(action.type){
    case SUBORDER_INIT:
      console.log('suborder_init')
      return {...state, suborders: [] }

    case SUBORDER_TOGGLE:
      return {...state, current: {...state.current, suborder: action.data} }

    case SUBORDER_ADD:
      const idx = action.item.id
      let res = state.suborders.find(i => i.id === idx)
      // console.log('idx:'+idx)
      // console.log(res)
      if(res === undefined)
        return {...state, suborders: state.suborders.concat(action.item) }
      res.quantity++;
      return {...state, suborders: state.suborders.map(i => i.id === idx ? res : i)}

    case SUBORDER_DELETE:
      return {...state, suborders: state.suborders.filter(j => j.id !== action.id)}

    case SUBORDER_CHANGEQTY:
      return {...state, suborders: state.suborders.map(j => j.id === action.id
        ? Object.assign(j, {quantity: Math.max(action.qty,1) }) : j )}

    // case SUBORDER_FAILED:
    //   return state.map(i => {
    //     const ll = props.invalid_orders.find(j => j.id === i.id) 
    //     return ll ? Object.assign(i,{warning: `max ${ll.maxQty}`}) 
    //               : Object.assign(i,{warning: ''}) 

  }
}