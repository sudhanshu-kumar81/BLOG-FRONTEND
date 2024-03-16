

import { Box, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system'
const Container = styled(Box)(({ theme }) => ({
    width: '80vw',
    backgroundColor:'red',
    justifyItems:'center',
    margin:'auto',
    [theme.breakpoints.down('sm')]: {
      width: '95%', // Full width on small screens
      
    },
  }));



const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    display:flex;
    justifyContent:center;
    justifyItem:center;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;


const Wrapper = styled(Box)`
    padding: 10px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Container>
           <Banner/>
            <Wrapper>
                <Typography variant="h3">Code for Interview</Typography>
                <Text variant="h5">This project  uses several concept Frontend: React.js & Material-UI, Backend: Node.js & Express.js, Database: MongoDB, Authentication: JWT .
                </Text>
                <Text variant="h5">I'm a Software Engineer based in India. 
                    I've built several websites with responsiveness,using several concept. <br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/sudhanshu-kumar81" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/hindustanisudhanshu/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                        or contact from Contact section <br/><NavLink className="bg-blue-300 p-1 ml-2 rounded hover:bg-blue-600" to='/contact'>Go to contact page</NavLink>
                </Text>
            </Wrapper>
        </Container>
    )
}

export default About;