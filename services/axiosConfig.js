import axios from 'axios';
import { server } from '../src/constants/config';
import { useSelector } from 'react-redux';

const url = server;

const privateRequest = axios.create({url});

privateRequest.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");
    
    console.log( token);

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
})

export { privateRequest };