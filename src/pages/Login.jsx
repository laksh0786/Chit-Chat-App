import { CameraAlt } from '@mui/icons-material';
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { dataValidator } from '../utils/validators';

//variant prop is used to change the style of the textfield
//component prop is used to change the semantic element of the textfield 
//for example <Container component={"main"}> will render a <main> element instead of a <div> element



const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [validationError, setValidationError] = useState({
        email: "",
        password: "",
        fullName: ""
    });

    const registerToggleHandler = () => {
        setIsLogin(((prev) => !prev));
    }

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        bio: "",
        fullName: "",
        avatar: "",
    })

    const changeFileHander = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // console.log(reader);
        reader.onload = () => {
            setRegisterData((prev) => ({
                ...prev,
                avatar: reader.result
            }))
        }
    }

    const changeLoginDataHandler = (e) => {

        const { name, value } = e.target;

        setValidationError((prev) => ({
            ...prev,
            [name]: dataValidator(value, name)
        }))


        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const changeRegisterDataHandler = (e) => {
        const { name, value } = e.target;

        setValidationError((prev) => ({
            ...prev,
            [name]: dataValidator(value, name)
        }))

        setRegisterData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        if (validationError.email || validationError.password || validationError.fullName) {
            return;
        }

        console.log(registerData);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (validationError.email || validationError.password) {
            return;
        }
        console.log(loginData);
    }

    return (
        <div style = {{
            backgroundImage:"linear-gradient(rgba(200,200,200,0.5) , rgba(120 , 110 , 220 , 0.5)",
        }}
        >
            <Container component={"main"} maxWidth="xs" className=' h-screen flex items-center content-center'>

                <Paper elevation={6} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                }}>

                    {
                        isLogin ? (

                            // login Component
                            <>
                                <Typography variant="h4">Login</Typography>

                                <form className='w-full mt-4' onSubmit={handleLoginSubmit}>

                                    <TextField
                                        required
                                        fullWidth
                                        label="Email"
                                        variant='outlined'
                                        margin='normal'
                                        name="email"
                                        value={loginData.email}
                                        onChange={changeLoginDataHandler}
                                    />

                                    {
                                        validationError.email && (
                                            <Typography
                                                variant='caption'
                                                color='error'
                                            >
                                                {validationError.email}
                                            </Typography>
                                        )
                                    }

                                    <TextField
                                        required
                                        fullWidth
                                        label="Password"
                                        variant='outlined'
                                        type='password'
                                        margin='normal'
                                        name="password"
                                        value={loginData.password}
                                        onChange={changeLoginDataHandler}
                                    />
                                    {
                                        validationError.password && (
                                            <Typography
                                                variant='caption'
                                                color='error'
                                            >
                                                {validationError.password}
                                            </Typography>
                                        )
                                    }

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

                                    <Typography
                                        sx={{
                                            marginTop: "1rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        OR
                                    </Typography>

                                    <Button
                                        variant="text"
                                        fullWidth
                                        onClick={registerToggleHandler}
                                    >
                                        Don't have an account? Register
                                    </Button>

                                </form>

                            </>
                        ) : (

                            // Register Component
                            <>
                                <Typography variant="h4">Sign Up</Typography>

                                <form className='w-full mt-4' onSubmit={handleSignupSubmit}>

                                    <Stack position={"relative"} width={"10rem"} margin={"auto"}>

                                        <Avatar
                                            sx={{
                                                margin: "auto",
                                                width: "9rem",
                                                height: "9rem",
                                                objectFit: "contain",
                                            }}
                                            src={registerData.avatar}
                                        />

                                        <Tooltip title="Upload Avatar">
                                            <IconButton
                                                sx={{
                                                    position: "absolute",
                                                    bottom: 2,
                                                    right: 5,
                                                    color: "white",
                                                    bgcolor: "rgb(0,0,0,0.5)",
                                                    "&:hover": {
                                                        bgcolor: "rgb(0,0,0,0.7)"
                                                    }
                                                }}
                                                component="label"
                                            >
                                                <CameraAlt />
                                                <VisuallyHiddenInput type="file" onChange={changeFileHander} />
                                            </IconButton>
                                        </Tooltip>

                                    </Stack>

                                    <TextField
                                        required
                                        fullWidth
                                        label="Full Name"
                                        variant='outlined'
                                        margin='normal'
                                        name="fullName"
                                        value={registerData.fullName}
                                        onChange={changeRegisterDataHandler}
                                    />
                                    {
                                        validationError.fullName && (
                                            <Typography
                                                variant='caption'
                                                color='error'
                                            >
                                                {validationError.fullName}
                                            </Typography>
                                        )
                                    }

                                    <TextField
                                        required
                                        fullWidth
                                        label="Bio"
                                        variant='outlined'
                                        margin='normal'
                                        name="bio"
                                        value={registerData.bio}
                                        onChange={changeRegisterDataHandler}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="Email"
                                        variant='outlined'
                                        margin='normal'
                                        name='email'
                                        value={registerData.email}
                                        onChange={changeRegisterDataHandler}
                                    />
                                    {
                                        validationError.email && (
                                            <Typography
                                                variant='caption'
                                                color='error'
                                            >
                                                {validationError.email}
                                            </Typography>
                                        )
                                    }

                                    <TextField
                                        required
                                        fullWidth
                                        label="Password"
                                        variant='outlined'
                                        type='password'
                                        margin='normal'
                                        name='password'
                                        value={registerData.password}
                                        onChange={changeRegisterDataHandler}
                                    />
                                    {
                                        validationError.password && (
                                            <Typography
                                                variant='caption'
                                                color='error'
                                            >
                                                {validationError.password}
                                            </Typography>
                                        )
                                    }

                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        fullWidth
                                        sx={{
                                            marginTop: "1rem",
                                        }}
                                    >
                                        Sign Up
                                    </Button>

                                    <Typography
                                        sx={{
                                            marginTop: "1rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        OR
                                    </Typography>

                                    <Button
                                        variant="text"
                                        fullWidth
                                        onClick={registerToggleHandler}
                                    >
                                        Already have an account? Login
                                    </Button>

                                </form>

                            </>
                        )
                    }


                </Paper>

            </Container>
        </div>
    )
}

export default Login