// imports
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// modello Author
const Author = require('../models/authorModel')

// RICHIESTE PER GLI AUTORI
// ottieni tutti gli autori
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find()

    if (authors.length === 0) {
      res.status(404).json({ message: 'Nessun autore trovato' })
    }
    res.json(authors)
  } catch (error) {
    console.error('Errore durante la lettura degli autori', error)
    res.status(500).json({ error: 'Errore durante la lettura degli autori', details: error.message })
  }
})

// ottieni un autore specifico tramite id
router.get('/:_id', async (req, res) => {
  const id = req.params._id
  console.log('ID dell\' autore cercato:', id)

  // validazione dell'id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'L\'id specificato non è valido' })
  }

  try {
    const author = await Author.findById(id)

    if (author) {
      res.json(author)
    } else {
      res
        .status(404)
        .json({ error: `l'autore con l'id ${id} non è stato trovato` })
    }
  } catch (error) {
    console.error("Errore durante la lettura dell'autore", error)
    res.status(500).json({ error: "Errore durante la lettura dell'autore", details: error.message })
  }
})

// elimina un autore tramite id
router.delete('/:_id', async (req, res) => {
  const id = req.params._id
  console.log('ID dell\'autore eliminato:', id)

  // validazione dell'id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'L\'id specificato non è valido' })
  }

  try {
    const author = await Author.findByIdAndDelete(id)
    console.log(author)
    if (author) {
      res.json(author)
    } else {
      res
        .status(404)
        .json({ error: `l'autore con l'id ${id} non è stato trovato` })
    }
  } catch (error) {
    console.error("Errore durante l'eliminazione dell'autore", error)
    res
      .status(500)
      .json({ error: "Errore durante l'eliminazione dell'autore", details: error.message })
  }
}
)

// crea un nuovo autore
router.post('/', async (req, res) => {
  const authorData = req.body
  console.log('Dati dell\'autore da creare:', authorData)

  // validazione dei dati
  if (!authorData.name || !authorData.surname || !authorData.email) {
    return res.status(400).json({ error: 'I dati inseriti non sono validi' })
  }

  try {
    const newAuthor = await Author.create(authorData)
    console.log(newAuthor)
    res.json(newAuthor)
  } catch (error) {
    console.error("Errore durante la creazione dell'autore", error)
    res.status(500).json({ error: "Errore durante la creazione dell'autore", details: error.message })
  }
})

// ricevi tutti i post di uno specifico autore dal corrispondente ID
router.get('/:_id/posts', async (req, res) => {
  const id = req.params._id
  console.log('ID dell\'autore cercato:', id)
  // validazione dell'id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'L\'id specificato non è valido' })
  }

  try {
    const author = await Author.findById(id).populate('posts')

    if (author) {
      if (author.posts.length > 0) {
        res.json(author.posts)
        console.log('Post dell\'autore:', author.posts)
      } else {
        res.json({ message: "L'autore non ha post." })
      }
    } else {
      res.status(404).json({ error: `L'autore con l'id ${id} non è stato trovato` })
    }
  } catch (error) {
    console.error("Errore durante la lettura dei post dell'autore", error)
    res.status(500).json({ error: "Errore durante la lettura dei post dell'autore", details: error.message })
  }
})

module.exports = router
