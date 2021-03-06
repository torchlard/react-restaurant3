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
    role: '', username: '', password: ''
  },
  tables: [],
  masterOrders: [],
  orders: [],     // id, orderQty, arriveQty, name, price, foodId
  suborders: [],  // id, name, price, quantity, maxqty, warning, foodId 
  foods: [],      // name, price, quantity, category
  categories: [],
  current: {
    status: 'serving', paid: 0, change: 0,
    suborder: false,
    currentCat: '',
    title: '',
    authError: false
  },
  tableId: -1,
  masterId: -1,
  isSuccess: true,  // return value 
  resultData: []
}

export const GlobalContext = React.createContext({
  state: {},
  dispatch: () => {}
})




