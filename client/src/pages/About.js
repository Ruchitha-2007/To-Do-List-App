import React from 'react'

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h2 className="about-title">About MyApp</h2>
        <p className="about-text">
          Welcome to <strong>MyApp</strong> — a simple and intuitive To-Do List application 
          designed to help you stay organized and productive. 
          Easily add, edit, and track your daily tasks in one convenient place.
        </p>

        <p className="about-text">
          Our goal is to provide a clutter-free experience that keeps you focused on what really matters. 
          Whether it’s managing work projects or personal goals, MyApp helps you stay on top of your day.
        </p>

        <div className="about-features">
          <h3 className="features-title">Key Features:</h3>
          <ul className="features-list">
            <li>✅ Simple and elegant interface</li>
            <li>🕒 Real-time task updates</li>
            <li>📱 Fully responsive design</li>
            <li>🔐 Secure user authentication</li>
          </ul>
        </div>

        <p className="about-footer">
          Built with ❤️ using <span className="highlight">React.js</span> and modern web technologies.
        </p>
      </div>
    </div>
  )
}

export default About
