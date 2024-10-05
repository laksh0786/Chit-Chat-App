import React from 'react'
import AppLayout from '../components/layouts/AppLayout'
import { Box, Typography } from '@mui/material';
import { grayColor } from '../constants/color';

//HOC - Higher Order Component are functions that return a component and are used to wrap other components

const Home = () => {
  return (
    <Box height={"100%"} sx={{
      display: "flex",
      justifyContent: "center",
      bgcolor: grayColor
    }}>
      <Typography  variant="h5" sx={{
        p: "2rem",
        textAlign: "center"
      }}>
        Select a chat to start messaging
      </Typography>
    </Box>
  )
}

//App layout is a higher order component
//AppLayout() is a function that returns a function
//Now the returned function is used to wrap the Home component . 

//This is similar to the following code:
// const withAppLayout = AppLayout();
// const HomeWithAppLayout = withAppLayout(Home);

export default AppLayout()(Home);