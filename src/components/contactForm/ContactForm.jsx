import React, { useContext, useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
// Styling for the container box with faded background
const FormContainer = styled(Box)({
  maxWidth: 600,
  margin: 'auto',
  padding: 3,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 8,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const ContactPage = () => {
  const {login,setLogin,setUser,user}=useContext(UserContext)
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        issue: '',
        suggestion: ''
      });
    useEffect(()=>{
        const getEmail=async()=>{
         try{
            const response=await axios.get('https://blog-backend-2-913v.onrender.com/user/api/getDetails',{
                withCredentials:true
            })
         setFormData(pre=>({...pre, name: response.data.user.name,
            email: response.data.user.email}))
            
         }catch(e){
        if(e.response.data.message==='missing token'){
            toast.error("Login Please")
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setLogin(false)
            setUser(null)
            navigate('/login');
        }else{
            toast.error(e.response.data.message||e.message||"internal error");
            // navigate('/');
        }
         }
        }
        getEmail();
    },[])
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    try{
   const response=await axios.post('https://blog-backend-2-913v.onrender.com/user/api/saveSuggestion',formData,{
    withCredentials:true
   })
  //  console.log("response is ",response);
   if(response.data.success===true){
    toast.success(response.data.message)
    setFormData(pre=>({...pre, issue:"",
      suggestion:""}))
    navigate('/');
   }
   else{
    toast.error(response.data.message)
   }
    }catch(e){
        // console.log("error in editing details are ",e);
        if(e.response.data.message==='missing token'){
          toast.error("please login")
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setLogin(false)
          setUser(null)
          navigate('/')
      }else{
          toast.error(e.response.data.message||e.message||"internal error");
          // navigate('/')
      }
    }
  };
  const handleChangeName=(()=>{
    toast.error("can`t change name");
  })

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">Contact Us</Typography>
      <form style={{display:'flex', alignItems:'center',justifyContent:'center',flexDirection:'column' }} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
        //   name="name"
          label="Your Name"
          value={formData?.name}
          onChange={handleChangeName}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Your Email"
          name="email"
          type="email"
          value={formData?.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Your Issue"
          name="issue"
          value={formData?.topic}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Your suggestion"
          name="suggestion"
          multiline
          rows={6}
          value={formData?.suggestion}
          onChange={handleChange}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          //onClick={handleSubmit}
          sx={{ mt: 2, fontWeight: 'bold' }}
        >
          Submit
        </Button>
      </form>
    </FormContainer>
  );
};

export default ContactPage;
