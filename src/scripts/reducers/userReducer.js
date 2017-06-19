import { FETCH_USER, UPDATE_USER, UPDATE_USER_ERROR, UNAUTH_USER, READY_TO_UPDATE_USER} from '../actions/types.js';
import _ from 'underscore'

const INITIAL_STATE = { profile: undefined, message: '', updateUserError: undefined, updatedUser: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return _.extend( {}, state, { profile: action.payload.profile } );
    case READY_TO_UPDATE_USER:
      return _.extend( {}, state, { updatedUser: false } )
    case UPDATE_USER:
      return _.extend( {}, state, { profile: action.payload.profile, updatedUser: true } );
    case UPDATE_USER_ERROR:
      return _.extend( {}, state, { updateUserError: action.payload } );
    case UNAUTH_USER:
      return _.extend( {}, state, { profile: undefined } );

  }

  return state;
}