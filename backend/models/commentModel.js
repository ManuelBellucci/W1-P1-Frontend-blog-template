// imports
const mongoose = require('mongoose')

// schema
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

// modello
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
