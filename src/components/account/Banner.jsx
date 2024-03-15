import React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import styled from '@emotion/styled'
const Container=styled(Box)({
height:'50vh',
background:'url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)'
})
const Image=styled(Box)({
    background: 'url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x',
    width:'98vw',
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
})
const Heading=styled(Typography)({
    fontSize:'70px',
    color:'white',
    lineHeight:'1'
})
const SubHeading=styled(Typography)({
    fontSize:'20px',
    backgroundColor:'white',
    borderRadius: '4px'
})
const Banner = () => {
  return (
    <Container>
    <Image>
      <Heading >BLOG</Heading>
      <SubHeading>Code for Interview</SubHeading>
    </Image>
    </Container>
  )
}

export default Banner
