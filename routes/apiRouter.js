let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')
let User = require('../db/schema.js').User
let BlogPost = require('../db/schema.js').BlogPost

  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

  //Blog Post ROUTES
  apiRouter

  //Get all blog posts
  .get('/blogPosts', function(request, response){

    BlogPost.find(request.query, function(err, results){

      if(err) return response.json(err) 

      response.json(results)

    }).populate('an_embedded_schema_key_name').populate('another_embedded_schema_key_name')

  })

  //Retrieve a single blog post by id
  .get('/blogPosts/:_id', function(request, response){

    BlogPost.findById(request.params._id, function(err, results){

      if(err) return response.json(err) 
      response.json(results)

    }).populate('an_embedded_schema_key_name').populate('another_embedded_schema_key_name')

  })

  //Create a new blogpost
  .post('/blogPosts', function(request, response) {

    var newBlogPost = new BlogPost(request.body)

    newBlogPost.save(function(error, record) {
      
      if (error) {

        return response.status(400).json(error)

      }

      response.json(record)

    })

  })

  //Update a blogpost
  .put('/blogPosts/:_id', function(request, response){

    BlogPost.findByIdAndUpdate(request.params._id, request.body, function(err, record){

        if (err) {

          response.status(500).send(err)

        }

        else if (!record) {

          response.status(400).send('no record found with that id')

        }

        else {

          response.json(Object.assign({},request.body,record))

        }

    })

  })

  //Delete a blogpost 
  .delete('/blogPosts/:blogPostId', function(request,response){

    BlogPost.remove({_id: request.params.blogPostId}, function(error) {

      if (error) {

        return response.status(400).json(error)

      }

      response.json({

        msg: `blog post ${request.params.blogPostId} has been deleted.`,
        id: request.params.blogPostId

      })

    })

  })

module.exports = apiRouter