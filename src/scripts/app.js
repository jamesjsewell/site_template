import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import reduxThunk from 'redux-thunk';
import Cookies from 'universal-cookie'
import RouteConfig from './routes';
import reducers from './reducers/index.js';
import ReactGA from 'react-ga';
import { AUTH_USER } from './actions/types';

// Import stylesheets
//import './public/stylesheets/base.scss';

// Initialize Google Analytics
ReactGA.initialize('UA-000000-01');

const cookies = new Cookies();

function logPageView() {
  ReactGA.pageview(window.location.pathname);
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

var token = cookies.get('token');
var user = cookies.get('user')

if (token && user) {
  console.log(token)
  console.log(user)
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}


ReactDOM.render(
  <Provider store={store}>
  	<BrowserRouter
  //basename={optionalString}
  //forceRefresh={optionalBool}
  //getUserConfirmation={optionalFunc}
  //keyLength={optionalNumber}
>
		<RouteConfig />
    </BrowserRouter>
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