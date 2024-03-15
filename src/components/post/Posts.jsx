import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/system';
import SinglePost from './SinglePost.jsx';
import { Grid } from '@mui/material';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import {toast} from 'react-toastify'
const Posts = () => {
  const [category,setCategory]=useState("");
  const [post, setPost]= useState([]);
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();
  useEffect(() => {
    console.log("category is ",category);
    const getAllPost = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/api/getAllPosts',{
          params: {
            category: category
          },
          withCredentials: true
        })
        console.log("response.data.posts",response.data.posts);
        console.log("final step");
        setPost(response.data.posts);
      } catch (e) {
        console.log("error is ", e);
        if(e.response.data.message==='missing token'){
          toast.error(e.response.data.message)
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate('/login')
      }else{
          toast.error(e.response.data.message||e.message||"internal error");
      }
      }
    }
    getAllPost();
  }, [category]);
  useEffect(()=>{
   setCategory(searchParams.get('category'));
  },[searchParams])
  return (
  
    <Grid container spacing={3} > 
    {post.length > 0 ? (
      post?.map(p => (
        <Grid item xl={3} lg={4} md={6} sm={12} xs={12} key={p._id} >
          <NavLink to={`/details/${p._id}`} style={{textDecoration:'none', color:'inherit'}}>
            <SinglePost post={p} />
          </NavLink>
        </Grid>
      ))
    ) : (
      <Box style={{ color: '#878787', margin: '30px 80px', fontSize: '18px' }}>No Post to show</Box>
      
     
    )}
  </Grid>
   
    
  )
}

export default Posts
