import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const Delete = () => {
    const navigate=useNavigate()
    const {id}=useParams();
    console.log("id is ",id)
    useEffect(()=>{
   const DeletePost=async()=>{
    try{
    const response=await axios.get('https://blog-backend-2-913v.onrender.com/user/api/delete',{
        params:{
            _id:id
        },
        withCredentials:true
    })
      toast.success(response.data.message);
      navigate('/')
    console.log("response is ",response);
    }catch(e){
        console.log("error is ",e);
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
   DeletePost()
    },[id]);
  return (
    <></>
  )
}

export default Delete
