import foodFn from './server_food'
import masterFn from './server_masterOrder'

// [{id, quantity, master_order_id, food_id}, ...]

const dbGet = name => JSON.parse(localStorage.getItem(name));

export default {
  // get current table orders list
  'getTableOrders': masterId => {
    if(masterId === -1) return []
    
    const order_data = dbGet('orders')
    const food_data = dbGet('foods')

    const orders = order_data.filter(i => i.masterorder_id === masterId)

    const results = orders.map(i => {
      const food = food_data.find(j => j.id === i.food_id);
      // console.log(food)
      // console.log(i)
      return {
        id: i.id, 
        orderQty: i.ordered_qty,
        arriveQty: i.arrived_qty,
        name: food.name, 
        price: food.price,
        foodId: i.food_id }
    })
    // const tableNo = table_data.find(i => i.id === tableId).tableNo
    return results
  },

  // delete certain order, release food reserve
  'deleteOrder': (orderId) => {
    const order_data = dbGet('orders')

    const orders = order_data.filter(i => i.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(orders))
  },

  // check if food enough, reduce food quantity and add to order list
  'addOrders': (orders, masterid) => {
    const res = foodFn.consumeFood(orders);
    console.log(res)
    if (!res.result) return res;

    const order_data = [...dbGet('orders')]
    // order_data = order_data.concat(orders)
    for(let i of orders){
      const newid = order_data[order_data.length-1]['id']+1
      order_data.push({id: newid, ordered_qty: i.quantity, arrived_qty: 0, 
        masterorder_id: masterid, food_id: i.foodId })
    }
    localStorage.setItem('orders', JSON.stringify(order_data))
    return res
  }

}


// export default fn



