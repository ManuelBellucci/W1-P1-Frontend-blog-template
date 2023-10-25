// imports
import React from 'react'
import NavBar from './components/navbar/BlogNavbar'
import Footer from './components/footer/Footer'
import Home from './views/home/Home'
import Blog from './views/blog/Blog'
import NewBlogPost from './views/new/New'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFoundComponent from './components/NotFound/NotFoundComponent'

function App () {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/new' element={<NewBlogPost />} />
        <Route path='*' element={<NotFoundComponent />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
