import { useInputValidation } from '6pp'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { adminLogin, verifyAdmin } from '../../redux/thunk/admin';


const AdminLogin = () => {

    const dispatch = useDispatch();
    const { isAdmin } = useSelector(state => state.auth);

    const secretKey = useInputValidation("");

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log("Submit Handler");
        dispatch(adminLogin(secretKey.value));
    }

    useEffect(() => {

        dispatch(verifyAdmin());

    }, [dispatch])
    

    if (isAdmin) {
        return <Navigate to="/admin/dashboard" />
    }

    return (
        <div style={{
            backgroundImage: "linear-gradient(rgba(200,200,200,0.5) , rgba(120 , 110 , 220 , 0.5)",
        }}
        >
            <Container component={"main"} maxWidth="xs" className=' h-screen flex items-center content-center'>

                <Paper elevation={6} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                }}>


                    <Typography variant="h4" sx={{
                        fontSize: "1.5rem",
                    }}>Admin Login</Typography>

                    <form className='w-full mt-4' onSubmit={submitHandler}>

                        <TextField
                            required
                            fullWidth
                            label="Secret Key"
                            variant='outlined'
                            type='password'
                            margin='normal'
                            name="password"
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            fullWidth
                            sx={{
                                marginTop: "1rem",
                            }}
                        >
                            Login
                        </Button>

                    </form>

                </Paper>

            </Container>
        </div>
    )
}

export default AdminLogin