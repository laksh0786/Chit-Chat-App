import {configureStore} from "@reduxjs/toolkit";
import  authSlice from "./slices/auth";

// console.log(authSlice);

export const store = configureStore({
    reducer: {

        // Add reducers here

        // authSlice is the slice that we created in the slices folder and we are adding it to the store
        //using authSlice.name as the key we can get the name of the slice if we change the slice name in the future then we don't have to change the key in the store it will automatically get the name of the slice using authSlice.name
        //authSlice.reducer is the reducer that we created in the slice
        [authSlice.name]: authSlice.reducer
    
    }
})