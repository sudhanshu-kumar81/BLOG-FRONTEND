
import React, { useEffect, useState } from 'react'
import { Box, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material'
import { styled } from '@mui/system'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Container = styled(Box)(({ theme }) => ({
  width: '80vw',
  margin: '0 auto',
  padding: '0 20px',
  [theme.breakpoints.down('sm')]: {
    width: '100%', // Full width on small screens
    
  },
}));
const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'fit',
  display:'flex',
  justifyContent:'center'
})
const StyledFormControl = styled(FormControl)({
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'row'
})
const InputTextField = styled(InputBase)({
  flex: '1',
  margin: '0px 30px',
  fontSize: '25px',
})
const StyledTextareaAutosize = styled(TextareaAutosize)({
  width: '100%',
  marginTop: '50px',
  fontSize: '18px',
  border: 'none'

})
import UserContext from '../../context/UserContext.jsx';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const  EditDetails = () => {
    const {id}=useParams();
  const navigate=useNavigate();
     const { user,setUser,setLogin } = useContext(UserContext)
  const [userDetails, setUserDetails] = useState({ title: "", description: "", avatar: "", username: "", categories: "" });
  const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
  const [file, setFile] = useState('');
  useEffect(() => {
    const getImage = async () => {
      try {
        if (file) {
          const formData = new FormData();
      formData.append('avatar', file);
      const response = await axios.post('https://blog-backend-2-913v.onrender.com/user/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true

      })
          const responseUrl = response.data.url;
          setUserDetails(prev => ({ ...prev, avatar: responseUrl, username: user, categories: location.search?.split("=")[1] }))
        }

      } catch (e) {
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
    getImage();
    
  }, [file])
  useEffect(()=>{
  },[ userDetails.username, location.search])
  const changefileHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0])
  }
  const changeHandler=(e)=>{
    e.preventDefault();
    setUserDetails(prev=>({ ...prev, [e.target.name]: e.target.value }))
  }
  const updateHandler=async()=>{
    try{
     const response=await axios.post('https://blog-backend-2-913v.onrender.com/user/api/updatepost',userDetails,{
      withCredentials:true,
        params:{
            _id:id
        }
     })
     const EditData=response.data.posts;
     setUserDetails(prev => ({  title: EditData.title, description: EditData.description, avatar: EditData.avatar, username: EditData.username, categories: EditData.categories}))
     toast.success("updated successfully")
     navigate('/');
    }catch(e){
      if(e.response.data.message==='missing token'){
        toast.error(e.response.data.message)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setLogin(false);
        // navigate('/')
    }else{
        toast.error(e.response.data.message||e.message||"internal error");
    }
    }
  }
  useEffect(()=>{
    const EditData=async()=>{
     try{
      const response=await axios.get('https://blog-backend-2-913v.onrender.com/user/api/edit',{
        params:{
            _id:id
        },
        withCredentials:true
      })
      const EditData=response.data.posts;
      setUserDetails(prev => ({  title: EditData.title, description: EditData.description, avatar: EditData.avatar, username: EditData.username, categories: EditData.categories}))
     }catch(e){
        if(e.response.data.message==='missing token'){
          toast.error("Login Again")
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null)
          setLogin(false)
          // navigate('/')
      }else{
          toast.error(e.response.data.message||e.message||"internal error");
      }

     }
    }
    EditData();
  },[])

  return (
        <Container>
      <Image src={userDetails?.avatar?userDetails?.avatar:url}></Image>
      <StyledFormControl>
        <label htmlFor='fileInput'>
          <AddCircleIcon fontSize='large' color='action' />
        </label>
        <input id='fileInput'  onChange={changefileHandler} type='file' style={{ display: 'none' }}>
        </input>
        <InputTextField placeholder='title' value={userDetails?.title} name='title' onChange={changeHandler}/>
        
      </StyledFormControl>
      <StyledTextareaAutosize  onChange={changeHandler} name='description' minRows={3} placeholder='tell your story...'  value={userDetails?.description}/>
     <Box style={{display:'flex',justifyContent:'center', marginBottom:'10px'}}><Button variant="contained" onClick={updateHandler}>Update</Button></Box> 
    </Container>

  )
}

export default  EditDetails
