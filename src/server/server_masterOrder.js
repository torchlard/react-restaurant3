const fn = {
  'getMasterId': tableId => {
    const masterOrder_data = localStorage.getItem(masterOrders)
    return masterOrder_data.find(i => i.completed === 0 && i.table_id === tableId).id;
  },

  // freeze order list, ask customer to pay
  'checkout': masterOrderId => {
    const masterOrder_data = localStorage.getItem(masterOrders)
    masterOrder_data.find(i => i.id === masterOrderId).status = "checkout"
    localStorage.setItem(masterOrders, masterOrder_data)
  }
  
}

export default fn;







