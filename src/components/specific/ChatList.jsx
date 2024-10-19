import { Stack } from '@mui/material';
import React, { memo } from 'react';
import ChatItem from '../shared/ChatItem';
import { darkGray, lightGray, matteBlack, orange } from '../../constants/color';

const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [{
        chatId: "",
        count: 0
    }],
    handleDeleteChat
}) => {
    return (
        <Stack w={w} direction={"column"} spacing={2} padding={2} sx={{
            overflowY: "auto",
            height: "calc(100%)",
            '&::-webkit-scrollbar': {
                width: '8px', // Width of the scrollbar
            },
            '&::-webkit-scrollbar-thumb': {
                background: darkGray, // Color of the scrollbar thumb
                borderRadius: '10px',
            },
        }}>

            {
                chats?.map((data, index) => {

                    const { avatar, _id, name, groupChat, members } = data;

                    const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
                    const isOnline = members?.some((member) => onlineUsers.includes(member));

                    return (
                        <ChatItem
                            index={index}
                            newMessageAlert={newMessageAlert}
                            isOnline={isOnline}
                            avatar={avatar}
                            name={name}
                            _id={_id}
                            key={_id}
                            groupChat={groupChat}
                            sameSender={_id === chatId}
                            handleDeleteChat={handleDeleteChat}
                        />
                    );
                })
            }

        </Stack>
    )
}

export default memo(ChatList);
