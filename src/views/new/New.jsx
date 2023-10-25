import React, { useCallback, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './styles.css'

// Componente per la creazione di un nuovo post
const NewBlogPost = (props) => {
  // States
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [cover, setCover] = useState('')
  const [readTime, setReadTime] = useState({
    value: 0,
    unit: 'minutes'
  })
  const [authorName, setAuthorName] = useState('')

  // Hook per la navigazione
  const navigate = useNavigate()

  // Callback per la gestione del contenuto del post
  const handleChange = useCallback((value) => {
    setText(value)
  })

  // Callback per la gestione del titolo del post
  const handleTitleChange = useCallback((event) => {
    setTitle(event.target.value)
  })

  // Callback per la gestione della categoria del post
  const handleCategoryChange = useCallback((event) => {
    setCategory(event.target.value)
  })

  // Callback per la gestione della copertina del post
  const handleCoverChange = useCallback((event) => {
    setCover(event.target.value)
  })

  // Callback per la gestione del tempo di lettura del post
  const handleReadTimeChange = useCallback((event) => {
    setReadTime({
      ...readTime,
      value: event.target.value
    })
  })

  // Callback per la gestione del nome dell'autore del post; dovrà essere preso dal login e non inserito manualmente (come per ora per farlo funzionare)
  const handleAuthorNameChange = useCallback((event) => {
    setAuthorName(event.target.value)
  })

  // Callback per la gestione dell'invio del form
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // Effettua la chiamata POST all'API per creare un nuovo post
      const response = await axios.post('http://localhost:3001/api/posts', {
        title,
        category,
        cover,
        readTime,
        content: text,
        // Dovrà essere preso dal login e non inserito manualmente (come per ora per farlo funzionare)
        author: {
          name: authorName,
          avatar: 'https://picsum.photos/seed/picsum/200/300'
        }
      })

      console.log('Nuovo post creato:', response.data)
      // Reindirizza l'utente alla pagina del post appena creato
      navigate(`/blog/${response.data._id}`)
    } catch (error) {
      console.error('Errore durante la creazione del post:', error)
    }
  }

  return (
    <Container className='new-blog-container'>
      <Form className='mt-5' onSubmit={handleSubmit}>
        <Form.Group controlId='blog-form' className='mt-3'>
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size='lg'
            placeholder='Titolo del post'
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='blog-category' className='mt-3'>
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size='lg'
            as='select'
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='blog-cover' className='mt-3'>
          <Form.Label>Copertina</Form.Label>
          <Form.Control
            size='lg'
            placeholder='URL della copertina'
            value={cover}
            onChange={handleCoverChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='blog-read-time' className='mt-3'>
          <Form.Label>Tempo di lettura</Form.Label>
          <Form.Control
            size='lg'
            type='number'
            placeholder='Tempo di lettura'
            value={readTime.value}
            onChange={handleReadTimeChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='blog-author' className='mt-3'>
          <Form.Label>Nome dell'autore</Form.Label>
          <Form.Control
            size='lg'
            placeholder='Nome dell autore'
            value={authorName}
            onChange={handleAuthorNameChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='blog-content' className='mt-3'>
          <Form.Label>Contenuto Blog</Form.Label>
          <ReactQuill
            value={text}
            onChange={handleChange}
            className='new-blog-content'
          />
        </Form.Group>
        <Form.Group className='d-flex mt-3 justify-content-end'>
          <Button
            type='reset'
            size='lg'
            variant='outline-dark'
          >
            Reset
          </Button>
          <Button
            type='submit'
            size='lg'
            variant='dark'
            style={{
              marginLeft: '1em'
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default NewBlogPost
