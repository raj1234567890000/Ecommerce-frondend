import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3 Footer'>
        <h4 className='text-center'>All Right Reserved © : Rohit Rajput 2025 !</h4>
        <p className='text-center mt-3'>
          <Link to="/about" className='footer'>about</Link>|<Link to="/contact" className='footer'>Contact</Link>|<Link to="/policy" className='footer'>Privacy Policy</Link>
        </p>
      
    </div>
  )
}

export default Footer
