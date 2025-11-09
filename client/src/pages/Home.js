import React,{useEffect,useState,useContext} from 'react'
import { axiosInstance } from '../api/axiosInstance';
import {AuthContext} from '../context/AuthContext'
import {Link,useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate();
    const {user,accessToken}=useContext(AuthContext)
    const [posts,setPosts]=useState([]);
    const [searchPost,setSearchPost]=useState('')
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        if(!accessToken){
            setPosts([])
            setLoading(false);
            return;
        }
        const fetchPosts=async()=>{
            try{
                console.log(accessToken)
                const res=await axiosInstance.get('/posts', {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${accessToken}` }
                  });
                  setPosts(res.data.posts);
            }catch(err){
                if (err.response?.status === 403) {
                    alert('Session expired. Please log in again.');
                    navigate('/login');
                } else {
                    console.log('Error while fetching posts in Home page', err);
                }
            }finally{
                setLoading(false);
            }
        }
        fetchPosts();
    },[accessToken])
    const filteredPosts=posts.filter(post=>
            post.title.toLowerCase().includes(searchPost.toLowerCase())
            ||
            post.content.toLowerCase().includes(searchPost.toLowerCase()
            )
        );
    if(loading) return <p>Loading Posts...</p>;
    if(!accessToken || !user){
        return (
            <div className="Home-div-login" >
              <h2 className="Home-div-login-heading">
                Please <Link to="/login" className="Home-div-login-link">Login</Link> or{' '}
                <Link to="/signup" className="Home-div-link-signup">Sign Up</Link> to view posts.
              </h2>
            </div>
        );
    }
  return (
    <div className='Home-div'>
        <form className="Home-form" >
            <input value={searchPost} className="Home-input" placeholder="search posts" onChange={(e)=>setSearchPost(e.target.value)} />
            <button className="search-button" >Search</button>
            <Link to='/newPost' className='Home-link-newpost'><button className="addPost-button" >Add Post</button></Link>
        </form>
        <h1 className='Home-heading' >All Posts</h1>
        { filteredPosts.length===0 ?(
                <p className='Home-heading-para'>No posts available</p>
            ):(
                filteredPosts.map(post=>(
                    <div className='Home-div' key={post._id}>
                        <h2 className='home-title' >{post.title}</h2>
                        <p className='home-content' >{post.content}</p>
                        <Link className='Home-link-edit-btn' to={`/edit/${post._id}`}><button className='home-edit-content'>Edit Post</button></Link>

                        <Link className='Home-link-delete-btn' to={`/delete/${post._id}`}><button>Delete Post</button></Link>
                    </div>
                ))
            )
        }
    </div>
  )
}

export default Home