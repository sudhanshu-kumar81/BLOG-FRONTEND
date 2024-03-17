import React, { useEffect, useState } from 'react'
import { Box, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material'
import { styled } from '@mui/system'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Container = styled(Box)(({ theme }) => ({
  margin: '10px 100px',
  
  [theme.breakpoints.down('md')]: {
      margin: '5px',
  }
}));
const Image = styled('img')({
  borderRadius:'20px',
  padding:'5px',
  width: '100%',
  height: '50vh',
  objectFit: 'cover',
  display:'flex',
  justifyContent:'center',
})
const StyledFormControl = styled(FormControl)(({theme})=>({
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    display:'flex',
    flexDirection:'column',
    '& #plus': {
     marginLeft:'40px'
    },
}

}))
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
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
const Createpost = () => {
  const navigate=useNavigate();
     const { user,login,setUser,setLogin } = useContext(UserContext)
  const location = useLocation();
  
  const [userDetails, setUserDetails] = useState({ title: "", description: "", avatar: "", username: "", categories: "" });
  const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
  const [file, setFile] = useState('');
  useEffect(() => {
    const getImage = async () => {
      try {
        if (file) {
          const formData = new FormData();
          console.log("formData is ",formData.avatar);
      formData.append('avatar', file);
      const response = await axios.post('https://blog-backend-2-913v.onrender.com/user/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true

      })
          console.log("response is ", response);
          const responseUrl = response.data.url;
          console.log("responseUrl", responseUrl)
          setUserDetails(prev => ({ ...prev, avatar: responseUrl, username: user, categories: location.search?.split("=")[1] }))
        }
        console.log("userDetails", userDetails)

      } catch (e) {
        console.log("error is ", e);
        if(e.response.data.message==='missing token'){
          toast.error("please Login Again");
          localStorage.removeItem("token");
           localStorage.removeItem("user");
           setLogin(false)
           setUser(null)
      }else{
          toast.error(e.response.data.message||e.message||"internal error");
      }
      }
    }
    getImage();
    console.log("userDetails", userDetails)
    
  }, [file])
  useEffect(()=>{
    console.log(" i am your baap userDetails", userDetails)
  },[ userDetails.username, location.search])
  const changefileHandler = (e) => {
    e.preventDefault();
    // console.log("e.target.file[0]", e.target.files[0]);
    setFile(e.target.files[0])
  }
  const changeHandler=(e)=>{
    e.preventDefault();
    // console.log("userDetails",userDetails);
    setUserDetails(prev=>({ ...prev, [e.target.name]: e.target.value }))
  }
  const publishHandler=async()=>{
    try{
      console.log("arrived in publish handler");
    console.log("userderails ae",userDetails);
     const response=await axios.post('https://blog-backend-2-913v.onrender.com/user/api/savepost',userDetails,{
      withCredentials:true
     })
     console.log("response",response);
     setUserDetails(pre=>({...pre,title:"",description:""}))
     toast.success(response.data.message);
     navigate('/');
    }catch(e){
      if(e.response.data.message==='missing token'){
        toast.error("please Login Again");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLogin(false)
        setUser(null)
    }else{
        toast.error(e.response.data.message||e.message||"internal error");
    }
    }
  }

  return (
        <Container>
      <Image src={userDetails.avatar?userDetails.avatar:url}></Image>
      <StyledFormControl>
        <label htmlFor='fileInput'>
          <AddCircleIcon id="plus" fontSize='large' color='action' style={{marginLeft:'10px'}}/>
        </label>
        <input id='fileInput' onChange={changefileHandler} type='file' style={{ display: 'none' }}>
        </input>
        <InputTextField placeholder='title'  name='title' onChange={changeHandler}/>
       
      </StyledFormControl>
      <StyledTextareaAutosize style={{padding:'10px', marginTop:'-3px'}} onChange={changeHandler} name='description' minRows={3} placeholder='tell your story...' />
      <Box  style={{display:'flex', justifyContent:'center',margin:'2px'}}><Button variant="contained" onClick={publishHandler} >Publish</Button></Box>
    </Container>
  )
}

export default Createpost





