const dbGet = () => JSON.parse(localStorage.getItem('masterOrders'));

const fn = {
  'getMasterId': tableId => {
    const masterOrder_data = dbGet()
    return masterOrder_data.find(i => i.status !== 'completed' 
      && i.table_id === Number(tableId)).id;
  },

  // freeze order list, ask customer to pay
  'checkout': masterOrderId => {
    const masterOrder_data = dbGet()
    masterOrder_data.find(i => i.id === masterOrderId).status = "checkout"
    localStorage.setItem('masterOrders', JSON.stringify(masterOrder_data))
  }
  
}

export default fn;







