import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>

        <p className="contact-text">
          Have questions, feedback, or issues? We're here to help!  
          Reach out to our support team using the details below.
        </p>

        <div className="contact-details">
          <h3 className="contact-number">📞 123-456-789</h3>
          <p className="contact-email">✉️ support@myapp.com</p>
        </div>

        <p className="contact-text">
          Our support team is available <strong>24/7</strong> to assist you with any queries.
        </p>

        <Link to="/" className="contact-home-link">← Back to Homepage</Link>
      </div>
    </div>
  )
}

export default Contact
