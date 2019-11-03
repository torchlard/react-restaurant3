// foodID, foodName, price, quantity, category

const fn = {
  'getAll': () => localStorage.getItem(foods),

  // update existing list of food info, each item has id
  'updateFood': foods => {
    const data = localStorage.getItem(foods)
    foods.forEach(i => {
      const idx = data.findIndex(j => j.id === i.id)
      Object.assign(data[idx], i)
    })
    localStorage.setItem(data)
  },

  // input: [{id, quantity}, ... ], output: [{orderId, maxQty}, ...]
  'consumeFood': orders => {
    let invalid = [];
    const food_data = localStorage.getItem(foods)

    // if any fail, not consume any
    orders.forEach(item => {
      const maxQty = food_data.filter(f => f.id === item.id)[0].quantity
      if(maxQty < item.quantity)
        invalid.push({id: item.id, maxQty: maxQty})
    });

    if(invalid.length > 0) return {result: false, order: invalid};

    // ok for all items
    orders.forEach(item => {
      const idx = food_data.findIndex(f => f.id === item.id)
      Object.assign(food_data[idx], {quantity: food_data[idx] - item.quantity})
    });

    localStorage.setItem(foods, food_data)
    return {result: true, order: []};
  }
}

export default fn;









