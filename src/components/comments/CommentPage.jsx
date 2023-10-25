// CommentPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Comment from './Comment'
import { Container } from 'react-bootstrap'
import axios from 'axios'

const CommentPage = () => {
  const { id } = useParams()
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  // Funzione per eliminare un commento
  const handleDeleteComment = async (commentId) => {
    try {
      // Effettua la richiesta di eliminazione
      await axios.delete(
        `http://localhost:3001/api/posts/${id}/comments/${commentId}`
      )

      // Aggiorna lo stato per riflettere la rimozione del commento
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      )
    } catch (error) {
      console.error("Errore durante l'eliminazione del commento:", error)
    }
  }

  return (
    <Container>
      <h2 style={{
        marginBottom: 20
      }}
      >Comment Page
      </h2>
      {comments.length > 0
        ? (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                id={comment._id}
                postId={id}
                author={comment.author}
                content={comment.content}
                onDeleteComment={handleDeleteComment}
              />
            ))
          )
        : (
          <p>Nessun commento disponibile.</p>
          )}
    </Container>
  )
}

export default CommentPage
