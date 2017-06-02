import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from '../actions/types.js';
import _ from 'underscore'

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false };

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {

    case AUTH_USER: {
      return _.extend( state, { error: '', message: '', authenticated: true } );
    }
    
    case UNAUTH_USER: {
      return _.extend( state, { authenticated: false, error: action.payload } );
    }
    
    case AUTH_ERROR: {
      return _.extend( state, { error: action.payload } );
    }
    
    case FORGOT_PASSWORD_REQUEST: {
      return _.extend( state, { message: action.payload.message } );
    }
    
    case RESET_PASSWORD_REQUEST: {
      return _.extend( state, { message: action.payload.message } );
    }
    
    case PROTECTED_TEST: {
      return _.extend( state, { content: action.payload.message } );
    }

  }

  return state;

}