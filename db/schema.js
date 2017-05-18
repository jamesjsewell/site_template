const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({

  email:     { type: String, required: true },
  password:  { type: String, required: true },
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

const blogPostSchema = new mongoose.Schema({
 
  title:     { type: String, required: true },
  description:  { type: String, required: true },
  comments:  { type: Array },
  createdAt: { type: Date, default: Date.now }

})

module.exports = {

  User: mongoose.model('User', usersSchema),
  BlogPost: mongoose.model('BlogPost', blogPostSchema)

}
