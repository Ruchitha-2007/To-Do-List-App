import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

const Navbar = () => {
    const {user,logout} =useContext(AuthContext)
  return (
    <nav className="navbar">
        <div className="nav-logo-container">
            <Link to="/" className="nav-logo">MyApp</Link>
        </div>
        <div className="navbar-left">
            <Link to='/about' className="link-to-abt" >About</Link>
            <Link to='/contact' className="link-to-contact">Contact</Link>
            <Link to='/' className="link-to-home">Home</Link>
        </div>
        <div className="navbar-right">
            {user ?(
                <>
                    
                    <span>Hello,{user.email.split('@')[0]}</span>
                    <button onClick={logout} className="nav-btn">Logout</button>
                </>
            )
            :  (
                <>
                    <Link to ='/login'>Login</Link>
                    <Link to ='/signup'>SignUp</Link>
                </>
            )
            }
        </div>
    </nav>
  )
}

export default Navbar