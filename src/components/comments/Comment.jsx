// imports
import React from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

// Componente Comment che mostra un singolo commento
const Comment = ({ id, postId, author, content, onDeleteComment }) => {
  const handleDeleteComment = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/posts/${postId}/comments/${id}`
      )
      // Se la richiesta di eliminazione ha successo, chiamare la funzione di callback per aggiornare lo stato nel componente padre
      onDeleteComment(id)
      console.log('Commento eliminato con successo!')
    } catch (error) {
      console.error("Errore durante l'eliminazione del commento:", error)
    }
  }
  return (
    <div>
      <strong>User: </strong>
      {author}
      <p>
        <strong>Comment: </strong>
        {content}
      </p>
      <Button variant='danger' onClick={handleDeleteComment}>
        Elimina commento
      </Button>
    </div>
  )
}

export default Comment
