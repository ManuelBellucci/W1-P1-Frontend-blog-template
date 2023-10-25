// imports
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// modello Post
const Post = require('../models/postModel')
// modello Comment
const Comment = require('../models/commentModel')

// RICHIESTE PER I POST
// ottieni tutti i post. Se il parametro title è presente, filtra i post per titolo, altrimenti ottieni tutti i post
router.get('/', async (req, res) => {
  const title = req.query.title

  // validazione del parametro title
  if (title && typeof title === 'string') {
    try {
      const posts = await Post.find({ title: { $regex: title, $options: 'i' } })
      res.json(posts)
    } catch (error) {
      console.error('Errore durante il recupero dei post:', error)
      res.status(500).json({ error: 'Errore durante il recupero dei post', details: error.message })
    }
  } else {
    // Altrimenti, ottieni tutti i post
    try {
      const posts = await Post.find()
      res.json(posts)
      console.log('Titoli dei post caricati:', posts.map(post => post.title))
    } catch (error) {
      console.error('Errore durante il recupero dei post:', error)
      res.status(500).json({ error: 'Errore durante il recupero dei post', details: error.message })
    }
  }
})

// ottieni un post specifico tramite id
router.get('/:_id', async (req, res) => {
  const id = req.params._id
  console.log('ID del post:', id)

  // validazione dell'id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'L\'id specificato non è valido' })
  }

  try {
    const post = await Post.findById(id).populate('comments')
    console.log(post)
    if (!post) {
      res
        .status(404)
        .json({ error: `Il post con l'id ${id} non è stato trovato` })
    } else {
      res.json(post)
    }
  } catch (error) {
    console.error('Errore durante il recupero del post:', error)
    res.status(500).json({ error: 'Errore durante il recupero del post', details: error.message })
  }
})

// elimina un post tramite id
router.delete('/:_id', async (req, res) => {
  const id = req.params._id
  console.log('ID del post eliminato:', id)

  // validazione dell'id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'L\'id specificato non è valido' })
  }

  try {
    const post = await Post.findByIdAndRemove(id)

    if (!post) {
      res
        .status(404)
        .json({ error: `Il post con l'id ${id} non è stato trovato` })
    } else {
      res.json(post)
      console.log('Post eliminato:', post)
    }
  } catch (error) {
    console.error('Errore durante l eliminazione del post:', error)
    res.status(500).json({ error: 'Errore durante l eliminazione del post', details: error.message })
  }
})

// crea un nuovo post
router.post('/', async (req, res) => {
  const post = req.body
  if (!post) {
    res.status(400).json({ error: 'Dati del post mancanti' })

    try {
      const newPost = await Post.create(post)
      res.json(newPost)
      console.log('Nuovo post creato:', newPost)
    } catch (error) {
      console.error('Errore durante la creazione del post:', error)
      res.status(500).json({ error: 'Errore durante la creazione del post', details: error.message })
    }
  }
})

// RICHIESTE PER I COMMENTI
// ottieni tutti i commenti di uno specifico post
router.get('/:id/comments', async (req, res) => {
  const postId = req.params.id

  // validazione dell'id
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: 'L\'id specificato non è valido' })
  }

  try {
    const post = await Post.findById(postId)
    console.log('Post:', post)
    // Controlla se il post esiste
    if (!post) {
      return res.status(404).json({ error: `Il post con id ${postId} non esiste` })
    }

    // Trova tutti i commenti associati al post
    const comments = await Comment.find({ postId })
    res.json(comments)
    console.log('Numero di commenti', comments.length)
  } catch (error) {
    console.error('Errore durante il recupero dei commenti:', error)
    res.status(500).json({ error: 'Errore durante il recupero dei commenti', details: error.message })
  }
})

// ottieni un commento specifico di un post specifico tramite id
router.get('/:postId/comments/:commentId', async (req, res) => {
  const { postId, commentId } = req.params

  // validazione dell'id del post
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: 'L\'id specificato per il post non è valido' })
  }

  // validazione dell'id del commento
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ error: 'L\'id specificato per il commento non è valido' })
  }

  try {
    // Controlla se il post esiste
    const post = await Post.findById(postId)
    console.log('Post:', post)
    if (!post) {
      return res.status(404).json({ error: `Il post con id ${postId} non esiste` })
    }

    // Trova il commento specifico associato al post
    const comment = await Comment.findOne({ _id: commentId, postId })
    if (!comment) {
      return res.status(404).json({ error: `Il commento con id ${commentId} non esiste per il post con id ${postId}` })
    }

    res.json(comment)
    console.log('Commento:', comment)
  } catch (error) {
    console.error('Errore durante il recupero del commento:', error)
    res.status(500).json({ error: 'Errore durante il recupero del commento', details: error.message })
  }
})

// aggiungi un nuovo commento a un post specifico
router.post('/:id/comments', async (req, res) => {
  const postId = req.params.id
  const { author, content } = req.body

  // validazione dell'id
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: 'L\'id specificato per il post non è valido' })
  }

  // validazione dei dati del commento
  if (!author || !content) {
    return res.status(400).json({ error: 'Dati del commento mancanti' })
  }

  try {
    // validazione del post
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ error: `Il post con id ${postId} non esiste` })
    }

    // Crea un nuovo commento
    const newComment = new Comment({ postId, author, content })

    // Salva il commento nel database
    await newComment.save()

    // Aggiungi il commento all'array comments del post
    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } })
    res.json(newComment)
    console.log('Commento aggiunto con successo')
  } catch (error) {
    console.error('Errore durante l\'aggiunta del commento:', error)
    res.status(500).json({ error: 'Errore durante l\'aggiunta del commento', details: error.message })
  }
})

// modifica un commento di un post specifico
router.put('/:id/comments/:commentId', async (req, res) => {
  const postId = req.params.id
  const commentId = req.params.commentId
  const { content } = req.body

  // validazione dell'id del post
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: 'L\'id specificato per il post non è valido' })
  }

  // validazione dell'id del commento
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ error: 'L\'id specificato per il commento non è valido' })
  }

  // validazione dei dati del commento
  if (!content) {
    return res.status(400).json({ error: 'Dati del commento mancanti' })
  }

  try {
    // Controlla se il post esiste
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ error: `Il post con id ${postId} non esiste` })
    }

    // Cerca il commento nel post
    const comment = post.comments.id(commentId)
    if (!comment) {
      return res.status(404).json({ error: `Il commento con id ${commentId} non esiste` })
    }

    // Modifica il contenuto del commento
    comment.content = content
    // Salva il post aggiornato nel database
    await post.save()

    // Restituisci il commento appena modificato
    res.json(comment)
    console.log('Commento modificato con successo')
  } catch (error) {
    console.error('Errore durante la modifica del commento:', error)
    res.status(500).json({ error: 'Errore durante la modifica del commento', details: error.message })
  }
})

// elimina un commento di un post specifico
router.delete('/:id/comments/:commentId', async (req, res) => {
  const postId = req.params.id
  const commentId = req.params.commentId

  // validazione dell'id del post
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: 'L\'id specificato per il post non è valido' })
  }

  // validazione dell'id del commento
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ error: 'L\'id specificato per il commento non è valido' })
  }

  try {
    // Controlla se il post esiste
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ error: `Il post con id ${postId} non esiste` })
    }

    // Cerca il commento nel modello Comment utilizzando findById
    const comment = await Comment.findById(commentId)
    console.log('Commento da eliminare trovato')
    if (!comment) {
      return res.status(404).json({ error: `Il commento con id ${commentId} non esiste` })
    }

    // Rimuovi il commento dall'array comments del post
    post.comments.pull(commentId)
    console.log('Commento rimosso dall\'array comments del post')

    // Rimuovi il riferimento al commento dal documento del commento stesso
    await Comment.deleteOne({ _id: commentId })

    // Salva il post aggiornato nel database
    await post.save()

    // Restituisci il commento eliminato
    res.json(comment)
    console.log('Commento eliminato con successo')
  } catch (error) {
    console.error('Errore durante l\'eliminazione del commento:', error)
    res.status(500).json({ error: 'Errore durante l\'eliminazione del commento', details: error.message })
  }
})

module.exports = router
