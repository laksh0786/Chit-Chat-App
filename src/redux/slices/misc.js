import {createSlice} from "@reduxjs/toolkit"


//initial state of the misc slice
const initialState = {
    isNewGroupModalOpen : false,
    isAddMemberModalOpen : false,
    isNotificationModalOpen : false,
    isMobileMenu : false,
    isSearchModalOpen : false,
    isFileMenuOpen : false,
    isDeleteMenuOpen : false,
    uploadingLoader : false,
    selectedDeleteChat : {
        chatId : "",
        groupChat : false   
    }

}


//creating a slice for the misc state
const miscSlice = createSlice({
    
    //name of the slice
    name : "misc",

    //initial state of the misc slice
    initialState,

    //reducers for the misc slice
    reducers:{

        setIsNewGroupModalOpen : (state, action) => {
            state.isNewGroupModalOpen = action.payload;
        },

        setIsAddMemberModalOpen : (state, action) => {
            state.isAddMemberModalOpen = action.payload;
        },

        setIsNotificationModalOpen : (state, action) => {
            state.isNotificationModalOpen = action.payload;
        },

        setIsMobileMenu : (state, action) => {
            state.isMobileMenu = action.payload;
        },

        setIsSearchModalOpen : (state, action) => {
            state.isSearchModalOpen = action.payload;
        },

        setIsFileMenuOpen : (state, action) => {
            state.isFileMenuOpen = action.payload;
        },

        setIsDeleteMenuOpen : (state, action) => {
            state.isDeleteMenuOpen = action.payload;
        },

        setUploadingLoader : (state, action) => {
            state.uploadingLoader = action.payload;
        },
        setSelectedDeleteChat : (state, action) => {
            state.selectedDeleteChat = action.payload;
        }

    }

})


export default miscSlice;

export const {
    
    setIsNewGroupModalOpen,
    setIsAddMemberModalOpen,
    setIsNotificationModalOpen,
    setIsMobileMenu,
    setIsSearchModalOpen,
    setIsFileMenuOpen,
    setIsDeleteMenuOpen,
    setUploadingLoader,
    setSelectedDeleteChat

} = miscSlice.actions;