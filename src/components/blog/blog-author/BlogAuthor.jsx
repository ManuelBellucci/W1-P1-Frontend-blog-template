// imports
import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import './styles.css'

// componente per la visualizzazione dell'autore del post
const BlogAuthor = props => {
  const { name, avatar } = props
  return (
    <Row>
      <Col xs='auto' className='pe-0'>
        <Image className='blog-author' src={avatar} roundedCircle />
      </Col>
      <Col>
        <div>di</div>
        <h6>{name}</h6>
      </Col>
    </Row>
  )
}

export default BlogAuthor
