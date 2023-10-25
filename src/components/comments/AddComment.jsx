// imports
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

// componente per l'aggiunta di un commento
const AddComment = ({ postId, onAddComment }) => {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)

  // Funzione per l'aggiunta di un commento
  const handleAddComment = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/posts/${postId}/comments`, {
        author,
        content
      })

      const newComment = response.data
      console.log('Nuovo commento aggiunto:', newComment)
      onAddComment(newComment)

      // Pulisci i campi dopo l'aggiunta del commento eventuali errori precedenti
      setAuthor('')
      setContent('')
      setError(null)
    } catch (error) {
      console.error('Errore durante l\'aggiunta del commento:', error)
      setError('Si è verificato un errore durante l\'aggiunta del commento.')
    }
  }

  return (
    <Form>
      <Form.Group controlId='author'>
        <Form.Label>Autore</Form.Label>
        <Form.Control
          type='text'
          placeholder='Inserisci il tuo nome'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId='content'>
        <Form.Label>Commento</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          placeholder='Inserisci il tuo commento'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Button variant='primary' onClick={handleAddComment}>
        Aggiungi Commento
      </Button>

      {/* Mostra l'errore, se presente */}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </Form>
  )
}

export default AddComment
