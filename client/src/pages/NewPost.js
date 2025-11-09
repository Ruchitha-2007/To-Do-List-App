import React,{useEffect,useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {axiosInstance} from '../api/axiosInstance.js'
import {AuthContext} from '../context/AuthContext'

const NewPost = () => {
    const {accessToken,user}=useContext(AuthContext)
    const navigate=useNavigate();
    const [postTitle,setPostTitle]=useState('');
    const [postContent,setPostContent]=useState('');
    useEffect(()=>{
        setPostTitle('');
        setPostContent('');
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axiosInstance.post('/posts',{
                title:postTitle,
                content:postContent,
                user
            },{
                withCredentials:true,
                headers:{Authorization:`Bearer ${accessToken}`}
            })
            alert('Post created successfully')
            navigate('/')
        }catch (err) {
            console.error('Error creating Post:', err);
          }          
    }

  return (
    <div className='newpost-div'>
        <form className='newpost-form' onSubmit={handleSubmit} >
            <label className='newpost-label-title' htmlFor="PostTitle">Post Title</label>
            <input className='newpost-title' placeholder='Enter Post title' id='PostTitle' value={postTitle} onChange={(e)=>setPostTitle(e.target.value)}/>
            <br />
            <br />
            <label className='newpost-label-content' htmlFor="PostContent">Post Content</label>
            <textarea className='newpost-content' placeholder='Enter Post title' id='PostContent' value={postContent} onChange={(e)=>setPostContent(e.target.value)}/>
            <br />
            <button className='newpost-form-btn' type="submit" >Submit</button>
        </form>
    </div>
  )
}

export default NewPost