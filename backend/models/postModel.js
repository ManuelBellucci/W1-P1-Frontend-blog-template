// imports
const mongoose = require('mongoose')

// schema
const postSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  cover: { type: String, required: true },
  readTime: {
    value: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  author: {
    name: { type: String, required: true },
    avatar: String
  },
  content: { type: String, required: true },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}
)

// modello
const Post = mongoose.model('Post', postSchema)

module.exports = Post
