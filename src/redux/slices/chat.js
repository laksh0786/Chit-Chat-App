import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromLocalStorage } from "../../lib/feature";
import { NEW_MESSAGE_ALERT } from "../../constants/event";


const initialState = {

    notificationCount : 0,

    newMessageAlert : getOrSaveFromLocalStorage({key:NEW_MESSAGE_ALERT, get:true}) || [
        {
            chatId : '',
            count : 0
        }
    ]

}


const chatSlice = createSlice({

    name: "chat",

    initialState,

    reducers: {

        incrementNotifications : (state) => {
            state.notificationCount++;
        },

        resetNotificationCount : (state) => {
            state.notificationCount = 0;
        },

        setNewMessagesAlert : (state, action) => {

            //if the chatId is already present in the messageAlert array then update the count else add a new object to the array

            const index = state.newMessageAlert.findIndex(alert => alert.chatId === action.payload.chatId);

            if(index !== -1){
                state.newMessageAlert[index].count++;
            } else{
                state.newMessageAlert.push({
                    chatId : action.payload.chatId,
                    count : 1
                })
            }

        },

        removeMessageAlert : (state, action) => {
            state.newMessageAlert = state.newMessageAlert.filter(
                alert => alert.chatId !== action.payload
            )
        },

    }

})


export default chatSlice;

export const {incrementNotifications, resetNotificationCount, setNewMessagesAlert, removeMessageAlert} = chatSlice.actions;