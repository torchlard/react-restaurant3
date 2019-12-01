import {ACCOUNT_SIGNIN, ACCOUNT_SIGNOUT, ACCOUNT_SYNC} from '../constants/actionTypes'

// cannot add default method
export default (state, action, dispatch) => {
  switch(action.type){
    case ACCOUNT_SIGNIN:
      const username = action.data.username
      const password = action.data.password
      if(username === 'admin') {
        console.log('admin login')
        return {...state, authenticated: true, edit: {table: true}, account: {
          role: 'admin', username: username, password: password
        }, current: {...state.current, authError: false}}
      }
      else if (username === 'worker'){
        console.log('worker login')
        return {...state, authenticated: true, edit: {table: false}, account: {
          role: 'worker', username: username, password: password
        }, current: {...state.current, authError: false}}
      }
      return {...state, authenticated: false, edit: {table: false}, account: {
        role: '', username: '', password: ''}, current: {...state.current, authError: true} }

    case ACCOUNT_SIGNOUT:
      console.log('signout')
      return {...state, authenticated: false, edit: {table: false}, account: {
        role: '', username: '', password: ''}}

  }
}















