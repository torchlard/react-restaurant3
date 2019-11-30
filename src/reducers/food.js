import { FOOD_INIT, FOOD_SETCAT } from "../constants/actionTypes";
import foodFn from '../server/server_food'

export default (state, action, dispatch) => {
  switch(action.type){
    case FOOD_INIT:
      const categories = foodFn.getAllCategory()
      return {...state, foods: foodFn.getAll(), categories: categories,
        current: {...state.current, currentCat: categories[0]} }

    case FOOD_SETCAT:
      return {...state, current: {...state.current, currentCat: action.item}}

    

  }
}  





