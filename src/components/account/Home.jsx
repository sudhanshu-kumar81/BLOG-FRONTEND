import React from 'react';
import UserContext from '../../context/UserContext.jsx';
import { useContext } from 'react';
import Login from './Login.jsx';
import Banner from './Banner.jsx';
import Category from './Category.jsx';
import Grid from '@mui/material/Grid';
import Posts from '../post/Posts.jsx';
import Footer from '../navbar/Footer.jsx';

const Home = () => {
  const { login } = useContext(UserContext);

  return (
    <div>
      {
        (login) ? (
          <>
            <Banner />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                <Category />
              </Grid>
              <Grid item xs={12} sm={8} lg={9} xl={9} md={9}>
                <Posts/>
              </Grid>
            </Grid>
            <Footer/>
          </>
        ) : (
          <>
            <Login />
          </>
        )
      }
    </div>
  );
}

export default Home;
