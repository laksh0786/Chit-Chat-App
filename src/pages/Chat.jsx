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
  _id:"ndnbdwubqpspokpkds",
  name:"John Doe",
}

const Chat = () => {

  const containerRef = useRef(null);

  return (
    <>

      <Stack ref={containerRef} height={"90%"} spacing={"1.5rem"} sx={{
        boxSizing: 'border-box',
        padding: '1.5rem',
        bgcolor: grayColor, // Light gray background
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRadius: '0.5rem', // Smooth corners
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
      }}>
        
        {/* <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: 'gray',
          fontStyle: 'italic',
        }}>
          No messages yet. Start the conversation!
        </Box> */}

        {
          sampleMessages.map((i)=>{
            return(
              <MessageComponent message={i} user={sampleUser}/>
            )
          })
        }

      </Stack>

      <form className='h-[10%]'>
        <Stack direction={"row"} className='h-full p-4 items-center relative' sx={{
          borderRadius: '1rem',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // A slight shadow for the form
          backgroundColor: '#fff', // Form background color
        }}>

          {/* Attach File Icon */}
          <IconButton sx={{
            position: 'absolute',
            left: '1rem',
            rotate: '45deg',
            bgcolor: '#f0f0f0',
            borderRadius: '50%',
            padding: '0.5rem',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              bgcolor: '#e0e0e0'
            }
          }}>
            <AttachFileIcon />
          </IconButton>

          {/* Input Box */}
          <InputBox placeholder='Type your message here....' />

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