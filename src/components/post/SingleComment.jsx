import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from '../../context/UserContext';
import {styled} from '@mui/system';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//StyledDate
const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent:'space-around',
    minWidth:'35px',
  marginBottom: '5px',
  [theme.breakpoints.down('md')]: {
    display:'block',
    justifyContent:'center',
    justifyItem:'center',
      margin: '3px',
      padding:'5px',
  },
}));
const Component = styled(Box)({
  marginTop: '30px',
  background: '#f5f5f5',
  padding: '10px'
})
// const Container = styled(Box)({
//   display: 'flex',
//   marginBottom: '5px',
// })
const Name = styled(Typography)({
  fontWeight: '600',
  fontSize: '18px',
  marginRight: '20px'
})
const StyledDate = styled(Typography)({
  display:'flex',
  justifyContent:'space-around',
  fontSize: '14px',
  color: '#878787',
  '&.*': {
    margin:'2px',
  },
})
const StyledIcon = styled(DeleteIcon)({
  marginLeft: 'auto',
  fontWeight: 'bold'
})
import { toast } from 'react-toastify'
const SingleComment = ({ comment, setToggle }) => {
  const navigate = useNavigate();
  const id = comment._id;
  console.log("id is", id);

  const { user } = useContext(UserContext)
  const deleteHandler = async (e) => {
    try {
      const response = await axios.get('https://blog-backend-2-913v.onrender.com/user/api/deleteComment', {
        params: {
          _id: id
        },
        withCredentials: true
      })
      console.log("response is ", response);
      setToggle(pre => !pre)
    } catch (e) {
      console.log("e in deleting component", e);
      if (e.response.data.message === 'missing token') {
        toast.error(e.response.data.message)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login')
      } else {
        toast.error(e.response.data.message || e.message || "internal error");
      }
    }
  }
  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>
          {new Date(comment.commentedAt).toDateString()}
          {
          comment.name === user && <StyledIcon onClick={deleteHandler} style={{float:'right'}}/>
        }
        </StyledDate>
       
      </Container>
      <Box style={{margin:'5px',padding:'5px'}}>
        <Typography style={{marginTop:'3px' }}>{comment.comments}</Typography>
      </Box>
    </Component>
  )
}

export default SingleComment
