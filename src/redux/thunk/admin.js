import { createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../constants/config"
import axios from 'axios';

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {

    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        };

        const { data } = await axios.post(`${server}/api/v1/admin/verify`, { secretKey }, config);

        localStorage.setItem("adminToken", data.token);

        return data.message;

    } catch (error) {

        //we have to throw the error so that the rejected action is dispatched
        console.log(error.response.data.message);
        throw error.response.data.message;

    }

})


const verifyAdmin = createAsyncThunk("admin/verify", async () => {
    try {

        const config = {
            withCredentials: true,
            headers: {
                "AdminAuthorization": `Bearer ${localStorage.getItem("adminToken")}`
            }
        }

        const { data } = await axios.get(`${server}/api/v1/admin`, config);

        // console.log(data);

        return data.admin;

    } catch (err) {
        throw err.response.data.message
    }
})


const adminLogout = createAsyncThunk("admin/logout", async () => {

    try {

        const config = {
            withCredentials: true,
            headers: {
                "AdminAuthorization": `Bearer ${localStorage.getItem("adminToken")}`
            }
        }

        const { data } = await axios.get(`${server}/api/v1/admin/logout`, config);

        localStorage.removeItem("adminToken");

        return data.message;

    } catch (err) {
        throw err.response.data.message
    }

})



export { adminLogin, verifyAdmin, adminLogout };