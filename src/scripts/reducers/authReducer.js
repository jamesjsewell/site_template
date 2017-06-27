import { AUTH_USER, GET_LOGGED_IN_USER, UNAUTH_USER, AUTH_ERROR, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST, LOGIN_ERROR, REGISTER_ERROR} from '../actions/types.js';
import _ from 'underscore'

const INITIAL_STATE = { loginError: undefined, registerError: undefined, authError: undefined, message: undefined, content: undefined, authenticated: false, user: undefined, didPasswordReset: false, didEmailSend: false, stateOfEmailSend: undefined };

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {

    case AUTH_USER: {
      return _.extend( {}, state, {error: '', message: '', authenticated: true, user: action.payload } )   
    }
    
    case UNAUTH_USER: {
      return _.extend( {}, state, { authenticated: false, loginError: undefined, registerError: undefined, error: action.payload, user: undefined } );
    }
    
    case AUTH_ERROR: {
      return _.extend( {}, state, { auth_error: action.payload } );
    }

    case LOGIN_ERROR: {
      return _.extend( {}, state, { loginError: 'invalid email or password' } );
    }

    case REGISTER_ERROR: {
      return _.extend( {}, state, { registerError: action.payload } );
    }
    
    case FORGOT_PASSWORD_REQUEST: {
      return _.extend( {}, state, { message: action.payload.message, didEmailSend: action.payload.didSend, stateOfEmailSend: action.payload.stateOfSend } );
    }
    
    case RESET_PASSWORD_REQUEST: {
      return _.extend( {}, state, { didPasswordReset: action.payload.didReset, stateOfReset: action.payload.message } );
    }
    
    case PROTECTED_TEST: {
      return _.extend( {}, state, { content: action.payload.message } );
    }

  }

  return state;

}