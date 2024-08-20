
import { Box, TextField, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useContext } from 'react';
import UserContext from '../../context/UserContext.jsx';
import { Navigate } from 'react-router-dom';
const MyBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
})
const MyComponent = styled(Box)({
    width: '350px',
    paddingTop: '40px',
    paddingBottom: '40px',
    padding: 'auto',
    margin: 'auto',
    boxShadow: '5px 2px 5px 2px rgba(0, 0, 0, 0.6)',
});
const MyImage = styled('img')({
    marginTop: '20px',
    width: '100px',
    margin: 'auto',
    display: 'flex',
});
const Wrapper = styled(Box)({
    padding: '20px 30px',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    rowGap: '20px',
});
const MyButton = styled(Button)({
    marginTop: '5px',
    height: '45px',
});
const MyButton2 = styled(Button)({
    marginTop: '5px',
    height: '45px',
    marginBottom: '10px',
    background: 'lightgreen',
    color: 'white',
    '&:hover': {
        background: 'green', // Change background color to red on hover
    }
});
const Text = styled(Typography)({
    paddingLeft: '45%'
});

const Login = () => {
    const { Login, setLogin, user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: "", password: "", name: "" })
    const changeSignupHandler = (e) => {
        setFormData(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const [account, toggleAccount] = useState('login');
    const toggleSignup = () => {
        (account === 'login') ? toggleAccount('signup') : toggleAccount('login')
    }
    const signupHandler = async (e) => {
        try {
            // e.preventDefault();
            const response = await axios.post('https://blog-backend-2-913v.onrender.com/user/api/register', formData);
            if (response.data.success === true) {
                toast.success(response.data.message)
                toggleSignup();
            }
            else {
                toast.error(response.data.message)
                // navigate('/')

            }
        } catch (e) {
            toast.error(e.response.data.message || e.message || "internal error");
            // navigate('/')
        }
    }

    const LoginHandler = async (e) => {
        try {
            // e.preventDefault();
            const response = await axios.post('https://blog-backend-2-913v.onrender.com/user/api/login', formData, {
                withCredentials: true
            });
            if (response.data.success === true) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", response.data.user.name)
                setLogin(true)
                setUser(response.data.user.name)
                toast.success("login successfully")
                navigate('/')

            }
            else {
                toast.error(response.data.message)
            }
        } catch (e) {
            toast.error(e.response.data.message || e.message || "internal error");
            // navigate('/login')
        }
    }
    return (
        <MyBox>
            <MyComponent>
                <Box>
                    <MyImage src='https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png' />
                    {
                        (account === 'login') ? (<Wrapper>
                            <TextField id="standard-basic" label="email" variant="standard" name="email" onChange={changeSignupHandler} value={formData.email} />
                            <TextField id="standard-basic2" label="Password" variant="standard" name="password" type="password" onChange={changeSignupHandler} value={formData.password} />
                            <MyButton variant="contained" onClick={LoginHandler} >Login</MyButton>
                            <Typography className=' pl-[45%]'>or</Typography>

                            <MyButton2 onClick={() => { toggleSignup() }}>Create an Account</MyButton2>
                        </Wrapper>) : (<Wrapper>
                            <TextField id="standard-basic" label="name" variant="standard" name="name" onChange={changeSignupHandler} value={formData.name} />
                            <TextField id="standard-basic2" label="email" variant="standard" name="email" onChange={changeSignupHandler} value={formData.email} />
                            <TextField id="standard-basic2" label="Password" type="password" variant="standard" name="password" onChange={changeSignupHandler} value={formData.password} />
                            <MyButton2 variant="contained" onClick={signupHandler}>Signup</MyButton2>
                            <Text>or</Text>
                            <MyButton onClick={() => { toggleSignup() }}>Already Have Account</MyButton>
                        </Wrapper>)
                    }



                </Box>
            </MyComponent>
        </MyBox>

    );
}

export default Login
