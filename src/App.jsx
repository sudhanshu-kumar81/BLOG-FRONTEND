
import './App.css'
import {  Route,Routes } from 'react-router-dom'
import Home from './components/account/Home.jsx'
import UserContext from './context/UserContext.jsx'
import { useContext, useEffect } from 'react'
import Login from './components/account/Login.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import About from './components/account/About.jsx'
import Logout from './components/account/Logout.jsx'
import Createpost from './components/create/Createpost.jsx'
import DetailsView from './components/post/DetailsView.jsx'
import EditDetails from './components/post/EditDetails.jsx'
import Delete from './components/post/Delete.jsx'
import ContactForm from './components/contactForm/ContactForm.jsx'
function App() {
  const {login,setLogin,setUser,user}=useContext(UserContext)
  useEffect(()=>{
    const data=localStorage.getItem("token")
    const data2=localStorage.getItem("user")
    if(data){
      setLogin(true)
      setUser(data2)
    }
  },[login])
  return (
    <>
     <Navbar/>
    <Routes>
      <Route path='/contact' element={<ContactForm/>}></Route>
      <Route path='/create' element={<Createpost/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/details/:id' element={<DetailsView/>}/>
      <Route path='/edit/:id' element={<EditDetails/>}/>
      <Route path='/delete/:id' element={<Delete/>}/>
      <Route path='/comment/:id' element={<Delete/>}/>
      <Route path='/*' element={<Home/>}/>
     
    </Routes>
    </>
  )
}

export default App
