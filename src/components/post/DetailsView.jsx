
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from '../../context/UserContext';
import {toast} from 'react-toastify'
import Comments from './Comments';

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
      margin: '3px',
      padding:'5px',
  },
}));


const Image = styled('img')({
  width: '100%',
  height: '50vh',
  // objectFit: 'cover'
});
const Heading=styled(Typography)({
    fontSize:'38px',
    fontWeight:'600',
    textAlign:'center',
    margin:'50px 0px 10px 0px',
    wordBreak:'break-word',
    
})
const StyledEditIcon=styled(EditIcon)({
     margin:'5px',
     padding:'5px',
     border:'1px solid #787878',
     borderRadius:'10px',
})
const StyledDeleteIcon=styled(DeleteIcon)({
    margin:'5px',
     padding:'5px',
     border:'1px solid #787878',
     borderRadius:'10px',
     
})
const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    
    display: 'flex',
    margin: '10px 0',
    [theme.breakpoints.down('md')]: {
      padding:'15px',
     
  },
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        paddingLeft:'5%',
    },

}));

const Description=styled(Typography)({
  color: '#878787',
  padding:'5px',
    wordBreak:'break-word',
})
const DetailsView = () => {
  const [post,setPost]=useState(null);
  const navigate=useNavigate();
   const {user,setUser,login,setLogin}=useContext(UserContext);
   const {id}=useParams();
    useEffect(()=>{
     const getPosts=async()=>{
     try{
       const response=await axios.get('https://blog-backend-2-913v.onrender.com/user/api/postDetails',{
        params:{
            _id:id
        },
        withCredentials:true
       })
       setPost(response.data.posts);

     }catch(e){
      if(e.response.data.message==='missing token'){
        toast.error("Login Expired");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLogin(true);
        setUser(false);
        // navigate('/')
    }else{
        toast.error(e.response.data.message||e.message||"internal error");
       
    }
     }
      }
      getPosts();
    },[]);
  return (
    
    <Container  >
      <Image id='userimg' src={post?.avatar}/>
      <Box style={{float:'right'}}>
      {console.log(  "post?.username===user",post?.username,user)}
        {
        
            post?.username===user&&(<>
           <NavLink to={`/edit/${post._id}`}><StyledEditIcon fontSize='large' color='primary'/></NavLink>
            <NavLink to={`/delete/${post._id}`}><StyledDeleteIcon fontSize='large' color='error'/></NavLink>
            </>)
        }
      </Box>
      < Heading>{post?.title}</ Heading>
      <Author>
        <Typography>Author:<box component="span" style={{fontWeight:'600'}}>{post?.username}</box></Typography>
        <Typography style={{marginLeft:'auto', fontWeight:'600'}}>{new Date(post?.createdAt).toDateString()}</Typography>
      </Author>
      <Description>Description:{post?.description}</Description>
      <Comments post={post}/>
      </Container>
    
  )
}

export default DetailsView
