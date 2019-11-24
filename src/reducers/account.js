import {ACCOUNT_SIGNIN, ACCOUNT_SIGNOUT, ACCOUNT_SYNC} from '../constants/actionTypes'

export default (state, action, dispatch) => {
  switch(action.type){
    case ACCOUNT_SIGNIN:
      const username = action.data.username
      if(username === 'admin') 
        return {...state, authenticated: true, edit: {table: true}}
      else if (username === 'worker')
        return {...state, authenticated: true, edit: {table: false}}
      return {...state, authenticated: false, edit: {table: false}, account: {
        role: '', username: '', password: ''}}

    case ACCOUNT_SIGNOUT:
      return {...state, authenticated: false, edit: {table: false}, account: {
        role: '', username: '', password: ''}}

    case ACCOUNT_SYNC:
      if(action.data.type === 'username')
        return {...state, username: action.data.payload}
      else
        return {...state, password: action.data.payload}

  }
}















