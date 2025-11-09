import React,{useEffect,useState,useContext} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {axiosInstance} from '../api/axiosInstance'
import {AuthContext} from '../context/AuthContext'
const DeletePost = () => {
    const {accessToken}=useContext(AuthContext)
    const {id}=useParams();
    const navigate=useNavigate();
    const [del,setDel]=useState(false);
    useEffect(()=>{
        const fetchPosts=async()=>{
            try{
                await axiosInstance.delete(`/posts/${id}`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });                  
                console.log('Post deleted successfully');
                setDel(true);
                navigate('/')
            }catch(err){
                console.log(`Error while deleting post : ${err}`);
            }
        }
        fetchPosts();
        
    },[id,accessToken,navigate])
    
  return (
    <div>
        <p>Deleting post...</p>
    </div>
  )
}

export default DeletePost