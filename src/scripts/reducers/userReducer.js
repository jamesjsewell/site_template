import { FETCH_USER, ERROR_RESPONSE } from '../actions/types.js';
import _ from 'underscore'

const INITIAL_STATE = { profile: {}, message: '', error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return _.extend( {}, state, { profile: action.payload.user } );
    case ERROR_RESPONSE:
      return _.extend( {}, state, { error: action.payload } );
  }

  return state;
}