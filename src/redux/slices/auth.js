import {createSlice} from "@reduxjs/toolkit";

//initial state
const initialState = {
    user: null,
    isAdmin:false,
    isLoading: true,
};

const authSlice = createSlice({
    
    name : "auth",
    
    initialState,

    reducers: {

        userExists: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },

        userNotExists: (state)=>{
            state.user = null;
            state.isLoading = false;
        }
    }

});


//exporting the actions
export const {userExists, userNotExists} = authSlice.actions;


//exporting the slice to use reducer in the store
export default authSlice;