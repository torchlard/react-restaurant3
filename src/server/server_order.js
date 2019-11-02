import orig_order_data, { order } from '../data/order_data'
import orig_table_data from '../data/table_data'
import orig_masterOrder from '../data/master_order_data'
import orig_food_data from '../data/food_data'
import foodFn from './server_food'

// [{id, quantity, master_order_id, food_id}, ...]

let [order_data, masterOrder_data, food_data, table_data] = 
  [orig_order_data, orig_masterOrder, orig_food_data, orig_table_data];

const fn = {
  // get current table orders list
  'getTableOrders': (tableId) => {
    const last = masterOrder.find(i => i.completed === 0 && i.table_id === tableId)
    const orders = order_data.filter(i => i.master_order_id === last.id)
    const results = orders.map(i => {
      const food = food_data.find(j => j.foodID === i.food_id);
      return {
        orderId: i.id, 
        ordered_qty: i.ordered_qty,
        arrived_qty: i.arrived_qty,
        foodName: food.foodName, 
        price: food.price * i.quantity }
    })
    const tableNo = table_data.find(i => i.id === tableId).tableNo
    return {orders: results, masterOrderId: last.id, tableNo: tableNo}
  },
  'deleteOrder': (orderId) => {
    const idx = order_data.findIndex(i => i.id === orderId);
    order_data.splice(idx,1)
  },

  // check if food enough, reduce food quantity and add to order list
  'addOrders': orders => {
    const invalid_order = foodFn.consumeFood(orders);
    if (invalid_order.length > 0) return invalid_order;

    order_data.push(orders);
  },
  // freeze order list, ask customer to pay
  'checkout': masterOrderId => {
    masterOrder_data.find(i => i.id === masterOrderId).status = "checkout"
  }
  
}











export default fn



