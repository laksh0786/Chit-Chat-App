import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import Grid from '@mui/material/Grid2'

//Higher Order Component - it is a function that returns a Component
const AppLayout = () => {

    return (WrappedComponent) => {

        return (props) => {

            // console.log(props);

            return (
                <>
                    <Title />
                    <Header />

                    <Grid container height={"calc(100vh - 4rem)"} >

                        <Grid
                            size={{ sm: 4, md: 3 }}
                            sx={{
                                display: { xs: "none", sm: "block" },
                                backgroundColor: "#f0f0f0"
                            }}
                            height={"100%"}
                        >
                            First
                        </Grid>


                        <Grid size={{xs:12 , sm:8 ,  md:5 , lg:6}} height={"100%"} >
                            <WrappedComponent {...props} />
                        </Grid>

                        <Grid 
                        size={{md:4 , lg:3}} 
                        height={"100%"}
                        sx={{
                            display:{xs:"none" , md:"block"},
                            // padding:"2rem",
                            backgroundColor:"rgba(0,0,0,0.85)"
                        }} >
                            Third
                            </Grid>

                    </Grid>



                </>
            )

        }

    }

}

export default AppLayout