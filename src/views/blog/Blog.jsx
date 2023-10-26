import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import BlogAuthor from '../../components/blog/blog-author/BlogAuthor'
import BlogLike from '../../components/likes/BlogLike'
import CommentPage from '../../components/comments/CommentPage'
import AddComment from '../../components/comments/AddComment'
import './styles.css'

// componente per la visualizzazione di un singolo post
const Blog = () => {
  // states
  const [blogData, setBlogData] = useState({})
  const [loading, setLoading] = useState(true)

  // hooks
  const params = useParams()
  const navigate = useNavigate()

  // hook per il fetch del post selezionato tramite id
  useEffect(() => {
    const { id } = params

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/posts/${id}`)

        if (!response.ok) {
          throw new Error('Post non trovato')
        }

        const data = await response.json()
        setBlogData(data)
        setLoading(false)
      } catch (error) {
        console.error('errore nel fetch del post:', error)
        navigate('/404', { replace: true })
      }
    }

    fetchData()
  }, [params, navigate])

  const handleAddComment = async (newComment) => {
    setBlogData((prevData) => ({
      ...prevData,
      comments: Array.isArray(prevData.comments) ? [...prevData.comments, newComment] : [newComment]
    }))
  }

  if (loading) {
    return <div>loading</div>
  } else {
    return (
      <div className='blog-details-root'>
        <Container>
          <Image className='blog-details-cover' src={blogData.cover} fluid />
          <h1 className='blog-details-title'>{blogData.title}</h1>

          <div className='blog-details-container'>
            <div className='blog-details-author'>
              <BlogAuthor {...blogData.author} />
            </div>
            <div className='blog-details-info'>
              <div>{blogData.createdAt}</div>
              {blogData.readTime && (
                <div>{`lettura da ${blogData.readTime.value} ${blogData.readTime.unit}`}</div>
              )}
              <div
                style={{
                  marginTop: 20
                }}
              >
                <BlogLike
                  defaultLikes={['123']}

                />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blogData.content
            }}
            style={{
              marginTop: 50,
              marginBottom: 50
            }}
          />
          <CommentPage postId={blogData._id} />
          <AddComment postId={blogData._id} onAddComment={handleAddComment} />
        </Container>
      </div>
    )
  }
}

export default Blog
