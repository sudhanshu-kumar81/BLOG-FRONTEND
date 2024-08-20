import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
const addElippsis=(str,limit)=>{
 return  str?.length>limit?str.substr(0,limit)+'...':str
}
const Container = styled(Box)({
    border: '1px solid #d3cede',
    borderRadius: '10px',
    margin: '10px',
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    height: '350px',
    ' & > p': {
      padding: '0px 5px 5px 5px'
    }
  });
const Image=styled('img')({
    width:'100%',
    borderRadius:'10px 10px 0px 0px',
    objectFit:'cover',
    height:'150px'
})
const Text=styled(Typography)({
    color:'#878787',
    fontSize:'12px',
    
})
const Heading=styled(Typography)({
    fontSize:'18px',
    fontWeight:'600',
    wordBreak:'break-word',
})
const Details=styled(Typography)({
    fontSize:'14px', 
    wordBreak:'break-word',
})
const SinglePost = ({post}) => {
  return (
     <Container>
        <Image src={post.avatar} alt='blog'/>
        <Text>{post.categories}</Text>
        <Heading>{addElippsis(post.title,20)}</Heading>
        <Text>{post.username}</Text>
        <Details>{addElippsis(post.description,150)}</Details>
     </Container>
  )
}

export default SinglePost
