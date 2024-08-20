import {styled} from '@mui/system'
import { Button } from '@mui/material'
import { TextareaAutosize } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const MainContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    
})
const Container = styled(Box)(({ theme }) => ({
    width: '80vw',
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
         paddingLeft: '3px',
        justifyContent:'space-around',
        width:'100%'
    },
  }));

const SavedComment = styled(Box)({
    width: '80vw',
    margin: 'auto',
    wordBreak:'break-word'
})
const Image = styled('img')({
    margin: 'auto',
    height: '100%',
    width: '10%',
    borderRadius: '50px'
})

const StyledTextareaAutosize = styled(TextareaAutosize)({
    
    // height: '40px',
    height: '100px !important',
    width: '75%',
    margin: '0px,20px',
    paddingTop: '15px',
    paddingLeft: '5px',
    marginRight:'5px',
})
import SingleComment from './SingleComment.jsx'
const Comments = ({ post }) => {
    const [toggle, setToggle] = useState(false)
    const [allComment, setAllComment] = useState([]);
    const navigate = useNavigate();
    const { login,setLogin,user,setUser} = useContext(UserContext);
    const [comment, setComment] = useState({ name: user, postId: post?._id, comments: '', date: new Date() })
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const handleChange = (e) => {
        e.preventDefault();
        setComment(pre => ({ ...pre, name: user, postId: post._id, comments: e.target.value, date: new Date() }))
    }
    const addComment = async (e) => {
        try {
            const response = await axios.post('https://blog-backend-2-913v.onrender.com/user/api/addComment', comment, {
                withCredentials: 'true'
            })
            setComment(prev=>({...prev,comments:""}))
            setToggle(prev => !prev)
        } catch (e) {
            if (e.response.data.message === 'missing token') {
                toast.error("Login To comment")
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setLogin(false);
                setUser(null)
                // navigate('/')
            } else {
                toast.error(e.response.data.message || e.message || "internal error");
            }
        }
    }
    useEffect(() => {
        const getALLComments = async () => {
            try {
                const response = await axios.get('https://blog-backend-2-913v.onrender.com/user/api/showAllComments', {
                    params: {
                        _id: post?._id
                    },
                    withCredentials: true
                })
                setAllComment(response.data.comment)
            } catch (e) {
                //  toast.error(e.response.data.message)   
            }
        }
        getALLComments()
    }, [post, toggle]);
    useEffect(() => {
    }, [toggle])
    return (
        <MainContainer>
            <Container src={url} alt="dp">
                <Image src={url} alt="dp" />
                <StyledTextareaAutosize  minRows={1} placeholder='what is in your mind' value={comment.comments} onChange={(e) => handleChange(e)}>
                </StyledTextareaAutosize>
                <Button variant='contained' size='medium' style={{ height: '60px', width: '15%',margin:'auto',marginRight:'2px',padding:'auto'}} onClick={addComment}>Post</Button>
            </Container>
            <SavedComment>
                {
                    allComment?.map(comment => (
                        <SingleComment key={comment?._id} comment={comment} setToggle={setToggle} />
                    ))
                }
            </SavedComment>
        </MainContainer>

    )
}

export default Comments
