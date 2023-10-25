// imports
import React from 'react'
import { Container } from 'react-bootstrap'

// componente per il footer
const Footer = (props) => {
  return (
    <footer
      style={{
        paddingTop: 50,
        paddingBottom: 50
      }}
    >
      <Container>{`${new Date().getFullYear()} - © Strive School |Developed for homework projects.`}</Container>
    </footer>
  )
}

export default Footer
