import STORE from './store.js'
import User from './modelsAndCollections/userModel.js'
import $ from 'jquery'

const ACTIONS = {

	get_item: function(url, itemId) {


	},

	get_items: function(url) {


	},

	delete_item: function(itemLocation, itemId, onComplete){

		STORE.set( { aSyncDone: false } )

		$.ajax({

	            method: 'delete',
	            type: 'json',
	            url: `api/${itemLocation}/${itemId}`
	        
	        })
	        .done((response)=>{

	        	console.log('item deleted', response)
	       		
	       		STORE.set( { aSyncDone: true } )

				onComplete()

	        })
	        .fail((error)=>{

	            console.log('could not delete item', error)

	        })

	},

	post_item: function(itemLocation, itemDataObj, onComplete){

		STORE.set( { aSyncDone: false } )

		$.ajax({

	            method: 'POST',
	            type: 'json',
	            url: `api/${itemLocation}`,
	            data: itemDataObj
	        
	        })
	        .done((response)=>{

	        	console.log('posted a new item', response)
	        	
	        	STORE.set( { aSyncDone: true } )

				onComplete()

	        })
	        .fail((error)=>{

	            console.log('could not post item', error)

	        })

	},

	delete_blog_post: function(postId){

		function after_delete() {

			console.log('deleted it!')

		}

		this.delete_item('blogPosts', postId, after_delete)

	},

	create_blog_post: function(userInputObj){

		function after_post() {

			console.log('posted it!')

		}

		this.post_item('blogPosts', userInputObj, after_post)

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