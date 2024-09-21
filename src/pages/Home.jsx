import React from 'react'
import AppLayout from '../components/layouts/AppLayout'

//HOC - Higher Order Component are functions that return a component and are used to wrap other components

const Home = () => {
  return (
    <div>Home</div>
  )
}

//App layout is a higher order component
//AppLayout() is a function that returns a function
//Now the returned function is used to wrap the Home component . 

//This is similar to the following code:
// const withAppLayout = AppLayout();
// const HomeWithAppLayout = withAppLayout(Home);

export default AppLayout()(Home);