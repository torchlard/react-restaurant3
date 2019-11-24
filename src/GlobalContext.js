import React from 'react'

export const initState = {
  authenticated: false,
  edit: {
    table: false
  },
  permit: {
    edit: false
  },
  account: {
    role: 'worker', username: 'worker', password: '123'
  },
  tables: [],
  masterOrders: [],
  orders: [],     // id, orderQty, arriveQty, name, price
  suborders: [],  // id, name, price, quantity, maxqty, warning 
  foods: [],      // name, price, quantity, category
  categories: '',
  current: {
    status: 'serving', paid: 0, change: 0,
    suborder: false,
    currentCat: '',
    title: ''
  },
  tableId: -1,
  masterId: -1,
  tabkeNo: -1,
  isSuccess: true,  // return value 
  resultData: []
}

export const GlobalContext = React.createContext({
  state: initState,
  dispatch: () => {}
})




