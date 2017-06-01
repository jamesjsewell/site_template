import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
//import communicationReducer from './communication_reducer';
//import customerReducer from './customer_reducer';
// communication: communicationReducer,
// customer: customerReducer,

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer
});

export default rootReducer;