// imports
import React, { useState, useEffect } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import BlogItem from '../blog-item/BlogItem'

import './styles.css'

// componente per la visualizzazione di tutti i post
const BlogList = () => {
  // states per la lista dei post e il termine di ricerca
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // fetch posts ogni volta che searchTerm cambia (quando l'utente digita qualcosa nella barra di ricerca)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/posts?title=${searchTerm}`)
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
        throw Error(error, 'Error fetching posts')
      }
    }

    // timer per evitare di fare troppe richieste al server durante la digitazione
    const debounceTimer = setTimeout(() => {
      fetchPosts()
    }, 300)

    // Pulisci il timeout precedente se un nuovo carattere è digitato prima che scada il timer
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  return (
    <div
      className='blog-list-container' style={{
        marginTop: 50

      }}
    >
      <Row className='search-input'>
        <Col>
          <Form.Group controlId='searchForm'>
            <Form.Control
              type='text'
              placeholder='Search by title'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className='blog-list'>
        {posts.map((post) => (
          <Col key={post._id} md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post._id} {...post} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default BlogList
