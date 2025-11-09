import React ,{useState,useContext} from 'react'
import {axiosInstance} from '../api/axiosInstance'
import {AuthContext} from '../context/AuthContext'
import {useNavigate,Link} from 'react-router-dom'

const Login=()=>{
    const {login}=useContext(AuthContext)
    const navigate=useNavigate();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axiosInstance.post(
                '/auth/login',
                {email,password},
                {withCredentials:true}
            )
            login(res.data.accessToken,email);
            navigate('/');
        }catch(err){
            console.log('Error in Login page of handleLogin in client')
            alert('Login failed')
        }
    }
    return (
        <form onSubmit={handleSubmit} className="login-form" >
            <h2 className="login-heading">Login</h2>
            <input className="login-email-input" type='email' value={email} placeholder='email' onChange={(e)=>setEmail(e.target.value)} />
            <input className="login-password-input" type='Password' value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
            <button className="login-form-btn" type="submit">Login</button>
            <div className="login-form-div">
                <p className="login-form-signup">
                    Don't have an account?<Link to='/signup'>SignUp</Link>
                </p>
            </div>
        </form>
    )
}

export default Login;