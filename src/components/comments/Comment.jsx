// imports
import React from 'react'
import { Button } from 'react-bootstrap'

// Componente Comment che mostra un singolo commento
const Comment = ({ id, author, content, onDeleteComment }) => {
  return (
    <div>
      <strong>User: </strong>
      {author}
      <p>
        <strong>Comment: </strong>
        {content}
      </p>
      <Button variant='danger' onClick={() => onDeleteComment(id)}>
        Elimina commento
      </Button>
    </div>
  )
}

export default Comment
