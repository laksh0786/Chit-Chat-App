import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppLayout from '../components/layouts/AppLayout';
import { IconButton, Stack, Box, Skeleton } from '@mui/material';
import { grayColor, orange } from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialog/FileMenu';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/event';
import { useGetChatDetailsQuery, useGetChatMessagesQuery } from '../redux/api/api.rtk';
import { useSocketEvents } from '../hooks/useSocketEvents';
import { useDispatch, useSelector } from 'react-redux';
import useErrors from '../hooks/useErrors';
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenuOpen } from '../redux/slices/misc';


const Chat = ({ chatId }) => {

  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();

  //getting the user from the redux store
  const { user } = useSelector(state => state.auth);

  // State to store message input
  const [message, setMessage] = useState('');
  //state to store messages of the chat
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);


  // Fetch chat details we use skip when we don't have chatId
  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails?.data?.chat?.members;

  //getting the old messages of the chat
  const oldMessagesChunk = useGetChatMessagesQuery({ chatId, page });


  // Infinite Scroll Top
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,  //when page state changes it will trigger the fetch function useGetChatMessagesQuery
    setPage,
    oldMessagesChunk?.data?.messages //the data fetched from the useGetChatMessagesQuery will be added to the oldMessages state or data state
  )


  const errors = [
    {
      isError: chatDetails.isError,
      error: chatDetails.error
    },
    {
      isError: oldMessagesChunk.isError,
      error: oldMessagesChunk.error
    }
  ]

  useErrors(errors);

  

  // Function to open file menu
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenuOpen(true));
    //setting the anchor element to the current target that means its position will be at the current target
    setFileMenuAnchor(e.currentTarget);
  }

  //sending the message to the backend handler
  const submitMessageHandler = (e) => {

    e.preventDefault();

    if (!message.trim()) return;  // Prevent sending empty message

    // Emit the message to the server
    socket.emit(NEW_MESSAGE, {
      chatId, members, message
    });

    setMessage('');

  }

  // New message handler - wrapped in useCallback to prevent re-rendering
  //it is used to update the messages array when a new message is received
  const newMessageHandler = useCallback((data) => {
    setMessages(prev => [...prev, data.message])
  }, [])


  // Event handlers object
  const eventHandler = {
    [NEW_MESSAGE]: newMessageHandler,
  }

  // Handle socket events using custom hook
  useSocketEvents(socket, eventHandler);


  //combiniing all messages latest and the one got from the backend
  const allMessages = [...oldMessages, ...messages];


  return chatDetails.isLoading ? <Skeleton /> : (
    <>

      {/* Messages Container */}
      <Stack ref={containerRef} height={"90%"} spacing={"1.5rem"} sx={{
        boxSizing: 'border-box',
        padding: '1.5rem',
        bgcolor: grayColor,
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRadius: '0.5rem',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      }}>

        {/* Messages */}
        {
          allMessages.map((i) => {
            return (
              <MessageComponent key={i._id} message={i} user={user} />
            )
          })
        }

      </Stack>

      {/* Message Input Area */}
      <form className='h-[10%]' onSubmit={submitMessageHandler}>
        <Stack direction={"row"} className='h-full p-4 items-center relative' sx={{
          borderRadius: '1rem',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}>

          {/* Attach File Icon */}
          <IconButton
            onClick={handleFileOpen}
            sx={{
              position: 'absolute',
              left: '1.1rem',
              rotate: '45deg',
              bgcolor: '#f5f5f5',
              borderRadius: '50%',
              padding: '0.5rem',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                bgcolor: '#e0e0e0',
              }
            }}>
            <AttachFileIcon />
          </IconButton>

          {/* Input Box */}
          <InputBox
            placeholder='Type your message here....'
            value={message}
            onChange={e => setMessage(e.target.value)}
            sx={{
              padding: '1rem 4rem',
              borderRadius: '1.5rem',
              border: '1px solid #ddd',
              boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.05)',
              transition: '0.2s ease',
              '&:focus': {
                borderColor: orange,
                boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.1)',
              }
            }} />

          {/* Send Button */}
          <IconButton type='submit' sx={{
            rotate: '-35deg',
            background: `linear-gradient(-90deg, ${orange}, #ff914d)`,
            color: 'white',
            marginLeft: '0.8rem',
            padding: '0.7rem',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
            }
          }}>
            <SendIcon />
          </IconButton>

        </Stack>

      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId}/>

    </>
  )
}

export default AppLayout()(Chat);
