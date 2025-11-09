import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {axiosInstance} from '../api/axiosInstance'

const SignUp=()=>{
    const navigate=useNavigate();
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log({ name, email, password }); 
        try{
            await axiosInstance.post('/auth/signup',{name,email,password})
            alert('Sign up successful! Please login')
            navigate('/login')
        }catch(err){
            console.log("Sign Up falied in SignUp.js handleSubmit")
        }
    }

    return(
        <form className='signup-form' onSubmit={handleSubmit} >
            <h2 className='signup-form-heading'>SignUp</h2>
            <input className='signup-form-name' type='text' value={name} placeholder='name' onChange={(e)=>setName(e.target.value)} />
            <input className='signup-form-email' type='email' value={email} placeholder='email' onChange={(e)=>setEmail(e.target.value)} />
            <input className='signup-form-password' type='Password' value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
            <button className='signup-form-btn' type="submit">SignUp</button>
            <div className='signup-form-div'>
                <p className='signup-form-login'>
                    Already have an account?<Link to='/login'>Login</Link>
                </p>
            </div>
        </form>
    )
}

export default SignUp;