import { GET_ACTIVE_NAV_LINK } from '../actions/types.js';
import _ from 'underscore'

const INITIAL_STATE = { activeItem: ""};

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {

    case GET_ACTIVE_NAV_LINK: {
      console.log('reducing active nav link to', action.payload)
      console.log(_.extend( {}, state, {activeItem: action.payload } )  )
      return _.extend( {}, state, {activeItem: action.payload } )   
    }

  }

  return state;

}