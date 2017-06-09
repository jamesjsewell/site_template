
import { GET_ACTIVE_NAV_LINK } from './types';



export function setActiveNavLink(selectedItemName) {
  return function (dispatch) { 
    console.log('dispatching', selectedItemName)
    dispatch({ type: GET_ACTIVE_NAV_LINK, payload: selectedItemName });
  };
}