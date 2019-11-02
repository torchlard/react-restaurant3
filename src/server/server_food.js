import orig_food_data from '../data/food_data'

let food_data = orig_food_data
// foodID, foodName, price, quantity, category


const fn = {
  'getFood': () => food_data,
  'setFood': foods => food_data = foods,
  // [{id, foodName, price, quantity, warning}]
  'consumeFood': orders => {
    let invalid = [];
    orders.forEach(item => {
      const maxQty = food_data.filter(f => f.foodID === item.id)[0].quantity
      if(maxQuty < item.quantity)
        invalid.push({id: item.id, maxQty: maxQty})
    });

    if(invalid.length > 0) return invalid;

    // ok for all items
    orders.forEach(item => {
      let foodItem = food_data.filter(f => f.foodID === item.id)[0]
      foodItem.quantity = foodItem.quantity - item.quantity
    });

    return [];
  }
}

export default fn;









