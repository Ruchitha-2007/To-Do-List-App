import React,{useState,useEffect,useContext} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {axiosInstance} from '../api/axiosInstance'
const EditPost = () => {
    const navigate=useNavigate();
    const {accessToken,user}=useContext(AuthContext)
    const [editTitle,setEditTitle]=useState('');
    const [editContent,setEditContent]=useState('');
    const [loading,setLoading]=useState(true);
    const {id}=useParams();
    useEffect(()=>{
        const fetchPosts=async()=>{
            try{ 
                const res=await axiosInstance.get(`/posts`,{
                headers: { Authorization: `Bearer ${accessToken}` }, 
                withCredentials: true, }
                );
                const allPosts = res.data.posts;
                const post = allPosts.find((p) => p._id === id)            
                if(post){
                    setEditTitle(post.title);
                    setEditContent(post.content);
                } else {
                    alert("Post not found or you don’t have permission to edit it.");
                    navigate("/");
                }
                
            }catch(err){  
                console.log(`Error while editing posts : ${err}`);
            }finally{
                setLoading(false)
            }
        }
        fetchPosts();
        
    },[id,accessToken])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axiosInstance.put(`/posts/${id}`,{
                title:editTitle,
                content:editContent,
                userEmail:user.email
            },{
                headers:{Authorization: `Bearer ${accessToken}`},
            withCredentials:true 
            })
            alert('Post updated successfully!');
            navigate('/');
            window.location.reload();
        }catch(err){
            console.log(`Error while updating post : ${err}`)
        }
    }


    if(loading) return <p>loading posts...</p>
  return (
    <div className='edit-div'>
        
        <h2 className='edit-heading' > Edit Post </h2>
        
        <form className='edit-form' onSubmit={handleSubmit}>
            <label className='edit-label-title' htmlFor="edittitle">Post Title</label>
            <input className='edit-input-title' value={editTitle} placeholder="Post Title" onChange={(e)=>setEditTitle(e.target.value)} id="edittitle" />
            <br />
            <br />
            <label className='edit-label-content' htmlFor="editcontent">Post Title</label>
            <textarea className='edit-input-content' value={editContent} placeholder="Post Content" onChange={(e)=>setEditContent(e.target.value)} id="editcontent" />
            <br/>
            <br/>
            {editTitle && editContent &&
                <button type="submit" className='edit-form-btn'>Submit</button>
            }
        </form>
    </div>
  )
}

export default EditPost