/* import { switchMenuAction } from '../action'; */
import { SWITCH_MENU } from '../action/actionTypes' 

const initialState = {
  switchMenuName: ''
}

function imoocReducer(state = initialState, action){
  switch(action.type){
    case SWITCH_MENU:
      return {
        ...state,
        switchMenuName: action.switchMenuName
      }
    default:
      return state;
  }
}

export default imoocReducer;