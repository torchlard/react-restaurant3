import foodFn from './server_food'
import masterFn from './server_masterOrder'

// [{id, quantity, master_order_id, food_id}, ...]

const dbGet = name => JSON.parse(localStorage.getItem(name));

const fn = {
  // get current table orders list
  'getTableOrders': masterId => {
    
    const order_data = dbGet('orders')
    const food_data = dbGet('foods')

    const orders = order_data.filter(i => i.masterorder_id === masterId)
    const results = orders.map(i => {
      const food = food_data.find(j => j.id === i.food_id);
      return {
        orderId: i.id, 
        ordered_qty: i.ordered_qty,
        arrived_qty: i.arrived_qty,
        foodName: food.foodName, 
        price: food.price * i.quantity }
    })
    // const tableNo = table_data.find(i => i.id === tableId).tableNo
    return results
  },

  // delete certain order, release food reserve
  'deleteOrder': (orderId) => {
    const order_data = dbGet('orders')

    const orders = order_data.filter(i => i.id !== orderId);
    localStorage.setItem(orders, orders)
  },

  // check if food enough, reduce food quantity and add to order list
  'addOrders': orders => {
    const res = foodFn.consumeFood(orders);
    if (!res.result) return res.order;

    const order_data = dbGet('orders')
    order_data.push(orders);
    localStorage.setItem(order_data)
  }

}


export default fn



