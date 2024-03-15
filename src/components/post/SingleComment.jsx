import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from '../../context/UserContext';
import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Component=styled(Box)({
    marginTop:'30px',
    background:'#f5f5f5',
    padding:'10px'
})
const Container=styled(Box)({
    display:'flex',
  marginBottom:'5px',
})
const Name=styled(Typography)({
   fontWeight:'600',
   fontSize:'18px',
   marginRight:'20px'
})
const StyledDate=styled(Typography)({
    fontSize:'14px',
    color:'#878787'
 })
 const StyledIcon=styled(DeleteIcon)({
   marginLeft:'auto',
   fontWeight:'bold'
 })
 import {toast} from 'react-toastify'
const SingleComment = ({comment,setToggle}) => {
    const navigate=useNavigate();
    const id=comment._id;
    console.log("id is",id);

    const {user}=useContext(UserContext)
    const deleteHandler=async(e)=>{
       try{
    const response=await axios.get('http://localhost:3000/user/api/deleteComment',{
        params:{
        _id:id
        },
        withCredentials:true
    })
    console.log("response is ",response);
    setToggle(pre=>!pre)
       }catch(e){
        console.log("e in deleting component",e);
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
  return (
    <Component>
        <Container>
   <Name>{comment.name}</Name>
   <StyledDate>{new Date(comment.commentedAt).toDateString()}</StyledDate>
   {
    comment.name===user&&<StyledIcon onClick={deleteHandler}/>
   }
        </Container>
        <Box>
<Typography>{comment.comments}</Typography>
        </Box>
    </Component>
  )
}

export default SingleComment
