import { ORDER_ADD, ORDER_DELETE, ORDER_INIT } from '../constants/actionTypes'
import orderFn from '../server/server_order'
import tableFn from '../server/server_table'
import masterFn from '../server/server_masterOrder'

export default (state, action, dispatch) => {
  switch(action.type){
    case ORDER_INIT:
      const masterId = masterFn.getMasterId(action.tableId)
      return {...state, orders: orderFn.getTableOrders(masterId), 
        tableNo: tableFn.getNoById(action.tableId),
        masterOrderId: masterId,
        current: {...state.current, suborder: true}
      }

    case ORDER_ADD:
      // const orders = action.data
      const res = orderFn.addOrders(state.suborders)
      if (!res.result) 
        return {...state, suborders: res.orders};

      console.log("orders _ orderReducer")
      console.log(res)
      // success, update local order list
      let orderList = [...state.orders];

      res.orders.forEach(i => {
        let idx = orderList.findIndex(j => j.orderId === i.id);
        if (idx !== -1){
          orderList[idx].ordered_qty += i.quantity;
        } else {
          orderList.push({id: i.id, orderQty: i.quantity, 
            arriveQty: 0, name: i.name, price: i.price})
        }
      })
      console.log("orderList")
      console.log(orderList)
      return { orders:orderList, suborders: [], current: {...state.current, suborders: false}};

    case ORDER_DELETE:
      const orderId = Number(action.data)
      const lists = state.orders.filter(i => i.orderId !== orderId);
      orderFn.deleteOrder(orderId)
      return {...state, orders: lists}

  }
}







