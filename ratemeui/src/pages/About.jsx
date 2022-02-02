import React from 'react'
import Card from '../components/shared/Card'
import { Link } from 'react-router-dom'
function About() {
  return (
    <Card>
      <div className='about'>
        <h1>About this page</h1>
        <p>This is a React app to leave feedback for product or sevice </p>
        <p>Version 1.0.0</p>
        <p>
          <Link to='/'>Back To Home</Link>
        </p>
      </div>
    </Card>
  )
}

export default About
