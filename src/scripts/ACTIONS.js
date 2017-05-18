import STORE from './store.js'
import User from './modelsAndCollections/userModel.js'

const ACTIONS = {

	get_item: function(url, itemId) {


	},

	get_items: function(url) {


	},

	delete_item: function(itemType, itemId){

		STORE._set({

			dataLoaded: false

			})

		$.ajax({

	            method: 'delete',
	            type: 'json',
	            url: `api/${itemType}/${itemId}`
	        
	        })
	        .done((response)=>{

	        	console.log('item deleted', response)
	       		//ACTIONS.refresh_needed_data()
	       		STORE._set({
				dataLoaded: true
				})

	        })
	        .fail((error)=>{

	            console.log('could not delete item', error)

	        })

	},

	post_item: function(url, itemBody){


	},

	delete_blog_post: function(postId){

		STORE._set({

			dataLoaded: false

			})

		$.ajax({

	            method: 'delete',
	            type: 'json',
	            url: `api/blogPosts/${postId}`
	        
	        })
	        .done((response)=>{

	        	console.log('deleted a match', response)
	       		ACTIONS.refresh_needed_data()
	       		STORE._set({
				dataLoaded: true
				})

	        })
	        .fail((error)=>{

	            console.log('could not post match', error)

	        })

	},
	

	logout: function() {

		User.logout()

			.done(

				function(resp) {
					alert('you logged out!')
					location.hash = 'login'
				}

			)

			.fail(

				function(err) {
					alert('error logging out!')
					console.log(err)
				}

			)

	},

	logUserIn: function(email,password) {

		User.login(email,password)

			.done(

				function(resp) {
					alert('logged in!')
					console.log(resp)
					location.hash = 'issues/all'
				}

			)

			.fail(

				function(err) {
					alert('problem logging in!')
					console.log(err)
				}

			)

	},

	registerUser: function(userData) {

		User.register(userData)

			.done(

				
				function(resp) {
					alert(`new user ${resp.email} registered`)
					console.log(resp)
					ACTIONS.logUserIn(userData.email, userData.password)
				}

			)

			.fail(

				function(err) {
					alert('problem registering user!')
					console.log(err)
				}

			)
	},

}

export default ACTIONS