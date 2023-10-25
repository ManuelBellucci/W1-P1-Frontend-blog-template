// imports
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
// routes
const postsRouter = require('./routes/posts')
const authorsRouter = require('./routes/authors')

// inizializza l'applicazione
const app = express()
const port = process.env.PORT || 3001

// Collegamento a MongoDB
mongoose.connect(
  'mongodb+srv://manuelbellucci:Manu.2002@striveblogs.ya2w0pj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
const db = mongoose.connection

// gestione degli errori
db.on(
  'error',
  console.error.bind(console, 'Errore di connessione al database:')
)
// connessione stabilita
db.once('open', () => {
  console.log('Connesso al database MongoDB')
})

// middleware
app.use(cors())
app.use(express.json())

// route di base
app.get('/', (req, res) => {
  res.send('<h1>Strive Blogs API Rest</h1>')
})

// middleware per le route di posts e authors
app.use('/api/posts', postsRouter)
app.use('/api/authors', authorsRouter)

// server in ascolto
app.listen(port, () => {
  console.log(`App in ascolto nel porto ${port}!`)
})
