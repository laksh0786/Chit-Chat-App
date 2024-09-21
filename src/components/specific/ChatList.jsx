import { Stack } from '@mui/material'
import React, { memo } from 'react'
import ChatItem from '../shared/ChatItem'

const ChatList = ({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessagesAlert=[{
        chatId: "",
        count: 0
    }],
    handleDeleteChat

}) => {
  return (
    <Stack w={w} direction={"column"}>

        {
            chats?.map((data , index)=>{

                const {avatar , _id , name , groupChat , members} = data

                const newMessageAlert = newMessagesAlert.find(({chatId})=>chatId === _id)

                const isOnline = members?.some((member)=>{
                    return (
                        onlineUsers.includes(member)
                    )
                })

                return(
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
                )

            })
        }

    </Stack>
  )
}

export default memo(ChatList);