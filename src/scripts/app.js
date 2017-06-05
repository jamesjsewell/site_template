import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import thunk from 'redux-thunk';
import RouteConfig from './routes';
import reducers from './reducers/index.js';
import ReactGA from 'react-ga';
import { AUTH_USER } from './actions/types';
import { protectedTest } from './actions/authActions.js'

// Import stylesheets
//import './public/stylesheets/base.scss';

// Initialize Google Analytics
ReactGA.initialize('UA-000000-01');

function logPageView() {
  ReactGA.pageview(window.location.pathname);
}

const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware);


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