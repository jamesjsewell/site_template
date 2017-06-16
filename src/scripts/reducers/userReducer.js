import { FETCH_USER, UPDATE_USER, UPDATE_USER_ERROR } from '../actions/types.js';
import _ from 'underscore'

const INITIAL_STATE = { profile: {}, message: '', update_user_error: undefined };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return _.extend( {}, state, { profile: action.payload.user } );
    case UPDATE_USER:
      return _.extend( {}, state, { profile: action.payload.user } );
    case UPDATE_USER_ERROR:
      return _.extend( {}, state, { update_user_error: action.payload } );

  }

  return state;
}