import { ORDER_ADD, ORDER_DELETE, ORDER_INIT } from '../constants/actionTypes'
import orderFn from '../server/server_table'

export default (state, action, dispatch) => {
  switch(action.type){
    case ORDER_INIT:
      return {...state, orders: orderFn.getTableOrders(action.masterId), 
        tableNo: tableFn.getNoById(action.tableId),
        masterOrderId: action.masterId,
        invalid_orders: [] 
      }

    case ORDER_ADD:
      // const orders = action.data
      const invalid_orders = orderFn.addOrders(state.suborders)
      // some invalid orders, return list of them
      if (invalid_orders.length > 0) 
        return {...state, isSuccess: false, resultData: invalid_orders};

      console.log("orders _ orderReducer")
      console.log(orders)
      // success, update local order list
      let orderList = [...state.orders];
      /* orderId,  */
      orders.map(i => {
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
      return {  orders:orderList, isSuccess: true, resultData: []};

    case ORDER_DELETE:
      const orderId = Number(action.data)
      const lists = state.orders.filter(i => i.orderId !== orderId);
      orderFn.deleteOrder(orderId)
      return {...state, orders: lists}
      
  }
}







