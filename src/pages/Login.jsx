import { CameraAlt } from '@mui/icons-material';
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { dataValidator } from '../utils/validators';
import { server } from '../constants/config';
import { useDispatch } from 'react-redux';
import { setToken, userExists } from '../redux/slices/auth';
import toast from 'react-hot-toast';
import { userLogin, userRegister } from '../constants/apiEndpoints';
import {useFileHandler} from '6pp'
import { privateRequest } from '../../services/axiosConfig';

//variant prop is used to change the style of the textfield
//component prop is used to change the semantic element of the textfield 
//for example <Container component={"main"}> will render a <main> element instead of a <div> element



const Login = () => {

    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [validationError, setValidationError] = useState({
        email: "",
        password: "",
        name: ""
    });

    const avatar = useFileHandler("single");

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
        name: "",
    })


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
        console.log()
        setRegisterData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSignupSubmit = async (e) => {
        
        e.preventDefault();

        const toastId = toast.loading("Please wait while we are signing you in...");

        setIsLoading(true);

        if (validationError.email || validationError.password || validationError.name) {
            toast.error("Please fill all the fields correctly");
            return;
        }

        // console.log(registerData);

        const formData = new FormData();

        for (let key in registerData) {
            formData.append(key, registerData[key]);
        }

        formData.append("avatar", avatar.file);

        try{

            const config = {
                withCredentials: true,
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            }

            const {data} = await privateRequest.post(`${server}${userRegister}` , formData , config);
            console.log(data);

            dispatch(userExists(data.user));

            toast.success(data.message, {
                id: toastId
            });

        } catch(err){
            
            // console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong",{
                id: toastId
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleLoginSubmit = async (e) => {
        
        e.preventDefault();

        const toastId = toast.loading("Please wait while we are logging you in...");

        setIsLoading(true);

        if (validationError.email || validationError.password) {
            toast.error("Please fill all the fields correctly");
            return;
        }
        
        const config = {
            withCredentials: true,
            headers:{
                "Content-Type": "application/json"
            }
        };

        try{

            const {data} = await privateRequest.post(`${server}${userLogin}` , loginData , config)

            console.log(data);

            localStorage.setItem("token" , data.token);

            dispatch(userExists(data.user));

            toast.success(data.message , {
                id: toastId
            });

        } catch(err){

            // console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong",{
                id: toastId
            } );
        } finally {
            setIsLoading(false);
        }

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
                                        disabled={isLoading}
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
                                        disabled={isLoading}
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
                                            src={avatar.preview}
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
                                                <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                                            </IconButton>
                                        </Tooltip>

                                    </Stack>

                                    <TextField
                                        required
                                        fullWidth
                                        label="Full Name"
                                        variant='outlined'
                                        margin='normal'
                                        name="name"
                                        value={registerData.name}
                                        onChange={changeRegisterDataHandler}
                                    />
                                    {
                                        validationError.name && (
                                            <Typography
                                                variant='caption'
                                                color='error'
                                            >
                                                {validationError.name}
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
                                        disabled={isLoading}
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
                                        disabled={isLoading}
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