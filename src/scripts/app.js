import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';
import routes from './routes';
import reducers from './reducers/index.js';
import ReactGA from 'react-ga';
import { AUTH_USER } from './actions/types';

// Import stylesheets
//import './public/stylesheets/base.scss';

// Initialize Google Analytics
ReactGA.initialize('UA-000000-01');

function logPageView() {
  ReactGA.pageview(window.location.pathname);
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = cookie.load('token');

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} onUpdate={logPageView} />
  </Provider>,
  document.querySelector('.wrapper'));






































// import React from 'react'
// import ReactDOM from 'react-dom'
// import Backbone from 'backbone'
// import init from './init'
// import HomeView from './views/home/homeView.js'

// const app = function() {

// 	const TemplateRouter = Backbone.Router.extend({

// 		routes: {

// 			'home': 'showHomePage',
// 			'*splat': 'redirect'

// 		},

// 		redirect: function() {

// 			ReactDOM.render(<HomeView someProp="hello" />, document.querySelector('.page-container'))
	
// 		},

// 		showHomePage: function() {

// 			ReactDOM.render(<HomeView someProp="hello"/>, document.querySelector('.page-container'))

// 		}

// 	})

// 	new TemplateRouter
// 	Backbone.history.start()

// }

// // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// // NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
// export const app_name = init()
// app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..