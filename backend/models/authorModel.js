// imports
const mongoose = require('mongoose')

// Schema
const authorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true },
  data_di_nascita: { type: Date, required: true },
  avatar: String || null,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
})

// modello
const Author = mongoose.model('Author', authorSchema)

module.exports = Author
