import {ACCOUNT_SIGNIN} from '../constants/actionTypes'

export default (state, action, dispatch) => {
  switch(action.type){
    case ACCOUNT_SIGNIN:
      if(action.data.username === 'admin') 
        return {...state, aut}
  }
}















