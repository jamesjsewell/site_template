import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomeView from './views/home/homeView.js'

const app = function() {

	const TemplateRouter = Backbone.Router.extend({

		routes: {

			'home': 'showHomePage',
			'*splat': 'redirect'

		},

		redirect: function() {

			ReactDOM.render(<HomeView />, document.querySelector('.page-container'))
	
		},

		showHomePage: function() {

			ReactDOM.render(<HomeView />, document.querySelector('.page-container'))

		}

	})

	new TemplateRouter
	Backbone.history.start()

}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..