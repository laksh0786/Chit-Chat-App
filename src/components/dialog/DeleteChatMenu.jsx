import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenuOpen } from '../../redux/slices/misc';
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAsyncMutation from '../../hooks/useAsyncMutation';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api.rtk';

const DeleteChatMenu = ({ dispatch, deleteOptionAnchor }) => {

    const navigate = useNavigate();

    const { isDeleteMenuOpen, selectedDeleteChat } = useSelector(state => state.misc);

    const [deleteChatTrigger, _ , deleteChatData] = useAsyncMutation(useDeleteChatMutation);

    const [leaveGroupTrigger , __ , leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);

    const menuCloseHandler = () => {
        dispatch(setIsDeleteMenuOpen(false));
        deleteOptionAnchor.current = null;
    }

    //user leaving the gorup in group.jsx file we have done to delete the group
    const leaveGroupHandler = () => {

        menuCloseHandler();

        leaveGroupTrigger("Leaving Group....", selectedDeleteChat.chatId)
    }

    const removeFriendHandler = () => {

        menuCloseHandler();

        deleteChatTrigger("Deleting Chat....", selectedDeleteChat.chatId)

    }

    useEffect(()=>{

        if(deleteChatData || leaveGroupData){
            return navigate("/");
        }

    }, [deleteChatData, leaveGroupData])

    return (
        <Menu open={isDeleteMenuOpen} onClose={menuCloseHandler}
            anchorEl={deleteOptionAnchor.current}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center'
            }}
        >

            <Stack
                sx={{
                    width: "10rem",
                    padding: "0.5rem",
                    cursor: "pointer",
                }}
                onClick={selectedDeleteChat?.groupChat ? leaveGroupHandler : removeFriendHandler}
                direction={"row"} spacing={"0.5rem"} alignItems={"center"}
            >

                {
                    selectedDeleteChat?.groupChat ? (
                        <>
                            <ExitToAppIcon />
                            <Typography>Leave Group</Typography>
                        </>
                    ) : (
                        <>
                            <DeleteIcon />
                            <Typography>Remove Friend</Typography>
                        </>
                    )
                }

            </Stack>

        </Menu>
    )
}

export default DeleteChatMenu