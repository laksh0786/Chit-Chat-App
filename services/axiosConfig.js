import axios from 'axios';
import { server } from '../src/constants/config';

const url = server;

const publicRequest = axios.create({url});

const privateRequest = axios.create({url});

privateRequest.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
})

export {publicRequest, privateRequest};