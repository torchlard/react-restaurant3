import { FOOD_INIT, FOOD_SETCAT } from "../constants/actionTypes";
import foodFn from '../server/server_food'

export default (state, action, dispatch) => {
  switch(action.type){
    case FOOD_INIT:
      const categories = foodFn.getAllCategory()
      const foods = foodFn.getAll()
      console.log('food_init')
      return {...state, foods: foods, categories: categories,
        current: {...state.current, currentCat: categories[0]} }

    case FOOD_SETCAT:
      return {...state, current: {...state.current, currentCat: action.item}}

  }
}  





