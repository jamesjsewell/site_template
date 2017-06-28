import { FETCH_USER, UPDATE_USER_PROFILE, UNAUTH_USER} from '../actions/types.js';
import _ from 'underscore'

const INITIAL_STATE = { profile: undefined, message: '', updatingProfile: undefined, updateProfileSuccess: undefined, updateProfileError: undefined };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return _.extend( {}, state, { profile: action.payload.profile } );
    case UPDATE_USER_PROFILE:
    console.log(state)
      return _.extend( {}, state, { profile: action.payload.profile, updatingProfile: action.payload.updating, updateProfileSuccess: action.payload.success, updateProfileError: action.payload.error } );
    case UNAUTH_USER:
      return _.extend( {}, state, { profile: undefined } );

  }

  return state;
}