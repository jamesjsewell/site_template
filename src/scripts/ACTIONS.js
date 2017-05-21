import STORE from './STORE.js'
import User from './modelsAndCollections/userModel.js'
import $ from 'jquery'

const ACTIONS = {

	post_item: function(itemDestination, itemDataObj, onComplete){

		STORE.set( { aSyncDone: false } )

		$.ajax({

	            method: 'POST',
	            type: 'json',
	            url: `api/${itemDestination}`,
	            data: itemDataObj
	        
	        })
	        .done((response)=>{

	        	console.log('posted a new item', response)

				onComplete(response)

				STORE.set( { aSyncDone: true } )

	        })
	        .fail((error)=>{

	            console.log('could not post item', error)

	            STORE.set( { aSyncDone: true } )

	        })

	},

	get_item_s: function(item_s, filterObj, onComplete) {

		STORE.set( { aSyncDone: false } )

		var itemsCollection = STORE.get(item_s)
	
		itemsCollection.fetch(filterObj)

			.then(function() {
				
				onComplete(itemsCollection)

				console.log(itemsCollection)

				STORE.set( { aSyncDone: true } )

			})

	},

	update_item: function(itemLocation, itemId, payload, onComplete){

		STORE.set( { aSyncDone: false } )

		$.ajax({

	            method: 'put',
	            type: 'json',
	            url: `api/${itemLocation}/${itemId}`,
	            data: payload
	        
	        })
	        .done((response)=>{

	        	console.log('item updated', response)

				onComplete(response)

				STORE.set( { aSyncDone: true } )

	        })
	        .fail((error)=>{

	            console.log('could not update item', error)

	            STORE.set( { aSyncDone: true } )

	        })

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

				onComplete(response)

				STORE.set( { aSyncDone: true } )

	        })
	        .fail((error)=>{

	            console.log('could not delete item', error)

	            STORE.set( { aSyncDone: true } )

	        })

	},

	create_blog_post: function(userInputObj){

		function after_post(ajaxResponse) {

			console.log('on complete executed after post and recieved ajax data', ajaxResponse)

		}

		this.post_item('blogPosts', userInputObj, after_post)

	},

	get_blog_posts: function(filterObj){

		function after_get(ajaxResponse) {

			console.log('on complete executed after get and recieved ajax data', ajaxResponse)

		}

		var queryObj = { data: filterObj }

		this.get_item_s('blogPosts', queryObj, after_get)

	},

	get_filtered_blog_posts: function(userInputObj){

		function after_get(ajaxResponse) {

			console.log('on complete executed after get and recieved ajax data', ajaxResponse)

		}

		var filterObj = { data: userInputObj }

		this.get_item_s('blogPosts', filterObj, after_get)

	},

	update_blog_post: function(postId, payload){

		function after_update(ajaxResponse) {

			console.log('on complete executed after update and recieved ajax data', ajaxResponse)

		}

		this.update_item('blogPosts', postId, payload, after_update)

	},

	delete_blog_post: function(postId){

		function after_delete(ajaxResponse) {

			console.log('on complete executed after delete and recieved ajax data', ajaxResponse)

		}

		this.delete_item('blogPosts', postId, after_delete)

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