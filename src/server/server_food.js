// foodID, foodName, price, quantity, category

const dbGet = () => JSON.parse(localStorage.getItem('foods'))

const fn = {

  'getAll': dbGet,

  // update existing list of food info, each item has id
  'updateFood': foods => {
    const data = dbGet()
    foods.forEach(i => {
      const idx = data.findIndex(j => j.id === i.id)
      Object.assign(data[idx], i)
    })
    localStorage.setItem('foods', JSON.stringify(data))
  },

  // input: [{id, quantity}, ... ], output: [{orderId, maxQty}, ...]
  'consumeFood': orders => {
    
    const food_data = dbGet()
    let invalid = false

    // if any fail, not consume any
    console.log(orders)
    orders.forEach((item,idx) => {
      const maxQty = food_data.filter(f => f.id === item.id)[0].quantity
      if(maxQty < item.quantity){
        orders[idx]['warning'] = 'not enough'
        orders[idx]['maxQty'] = maxQty
        invalid = true
      }
    });

    if(invalid) return {result: false, orders: orders};

    // ok for all items
    orders.forEach(item => {
      const idx = food_data.findIndex(f => f.id === item.id)
      food_data[idx].quantity += -item.quantity
    });

    localStorage.setItem('foods', JSON.stringify(food_data))
    return {result: true, orders: orders};
  },

  'getAllCategory': () => {
    const cats = dbGet().map(i => i.category)
    return [...new Set(cats)]
  }
}

export default fn;









