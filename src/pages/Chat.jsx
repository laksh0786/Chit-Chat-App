import React, { useRef } from 'react';
import AppLayout from '../components/layouts/AppLayout';
import { IconButton, Stack, Box } from '@mui/material';
import { grayColor, orange } from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialog/FileMenu';
import { sampleMessages } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const sampleUser = {
  _id: "ndnbdwubqpspokpkds",
  name: "John Doe",
}

const Chat = () => {

  const containerRef = useRef(null);

  return (
    <>

      <Stack ref={containerRef} height={"90%"} spacing={"1.5rem"} sx={{
        boxSizing: 'border-box',
        padding: '1.5rem',
        bgcolor: grayColor,
        overflowY: 'auto',
        borderRadius: '0.5rem',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      }}>

        {/* Messages */}
        {
          sampleMessages.map((i) => {
            return (
              <MessageComponent key={i._id} message={i} user={sampleUser} />
            )
          })
        }

      </Stack>

      <form className='h-[10%]'>
        <Stack direction={"row"} className='h-full p-4 items-center relative' sx={{
          borderRadius: '1rem',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}>

          {/* Attach File Icon */}
          <IconButton sx={{
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
          <InputBox placeholder='Type your message here....' sx={{
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

          {/* Enhanced Send Button */}
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

      <FileMenu />

    </>
  )
}

export default AppLayout()(Chat);
