import react, { useState } from 'react'
import UserContext from './UserContext.jsx';
const UserContextProvider=({children})=>{
const [login,setLogin]=useState(false);
const [user,setUser]=useState(null);
return(
    <UserContext.Provider value={{login,setLogin,user,setUser}}>
        {children}
    </UserContext.Provider>
)
}
export default UserContextProvider;