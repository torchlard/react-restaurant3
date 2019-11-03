import foodFn from './server_food'

// [{id, quantity, master_order_id, food_id}, ...]

const fn = {
  // get current table orders list
  'getTableOrders': (tableId) => {
    const masterOrder_data = localStorage.getItem(masterOrders)
    const order_data = localStorage.getItem(orders)

    const last = masterOrder_data.find(i => i.completed === 0 && i.table_id === tableId)
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
    const res = foodFn.consumeFood(orders);
    if (!res.result) return res.order;

    order_data.push(orders);
  },

  // freeze order list, ask customer to pay
  'checkout': masterOrderId => {
    masterOrder_data.find(i => i.id === masterOrderId).status = "checkout"
  }
  
}











export default fn



