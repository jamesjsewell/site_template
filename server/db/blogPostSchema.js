const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
 
  title:     { type: String, required: true },
  description:  { type: String, required: true },
  comments:  { type: Array },
  createdAt: { type: Date, default: Date.now }

})

module.exports = {
	
  BlogPost: mongoose.model('BlogPost', blogPostSchema)

}