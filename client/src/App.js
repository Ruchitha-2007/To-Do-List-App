import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import EditPost from './pages/EditPost'
import NewPost from './pages/NewPost'
import DeletePost from './pages/DeletePost'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoute from './ProtectedRoute'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        
        <Route path='/edit/:id' element={<ProtectedRoute><EditPost /></ProtectedRoute>}/>
        <Route path='/delete/:id' element={<ProtectedRoute><DeletePost /></ProtectedRoute>}/>
        <Route path='/newPost' element={<ProtectedRoute><NewPost /></ProtectedRoute>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
