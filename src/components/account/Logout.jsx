import React, { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Logout = () => {
  const navigate = useNavigate();
  const { login, setLogin, user, setUser } = useContext(UserContext)
  useEffect(() => {
    const tempLogout = async () => {
      try {
        const response = await axios.get('https://blog-backend-2-913v.onrender.com/user/api/logout', { withCredentials: true })
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLogin(false)
        setUser(null)
        toast.success(response.data.message)
        navigate('/');
      } catch (e) {
        if(e.response.data.message==='missing token'){
          toast.error(e.response.data.message)
          localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLogin(false)
        setUser(null)
          navigate('/')
      }else{
          toast.error(e.response.data.message||e.message||"internal error");
          navigate('/')
      }
      }

    }
    tempLogout();
  },[])
    return (
     <></>
    )
  }

export default Logout
