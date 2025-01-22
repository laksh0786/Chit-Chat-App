import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, adminLogout, verifyAdmin } from "../thunk/admin";
import toast from "react-hot-toast";

//initial state
const initialState = {
    user: null,
    isAdmin: false,
    isLoading: true,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null
};

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        userExists: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },

        userNotExists: (state) => {
            state.user = null;
            state.isLoading = false;
        },
        setToken : (state, action) => {
            state.token = action.payload;
        }
    },

    extraReducers: (builder) => {

        builder
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.isAdmin = true;
                toast.success(action.payload);
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.isAdmin = false;
                toast.error(action.error.message);
            })
            .addCase(verifyAdmin.fulfilled, (state, action)=>{
                state.isAdmin = action.payload;
            })
            .addCase(verifyAdmin.rejected, (state, action)=>{
                state.isAdmin = false;
            })
            .addCase(adminLogout.fulfilled, (state, action) => {
                state.isAdmin = false;
                toast.success(action.payload);
            })
            .addCase(adminLogout.rejected, (state, action) => {
                toast.error(action.error.message);
            })

    }

});


//exporting the actions
export const { userExists, userNotExists, setToken } = authSlice.actions;


//exporting the slice to use reducer in the store
export default authSlice;