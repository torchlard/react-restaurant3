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
  orders: [],
  tables: [],
  masterOrders: []
}

export const GlobalContext = React.createContext({
  state: initState,
  dispatch: () => {}
})




