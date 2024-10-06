import { KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material'
import { Box, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import React, { memo, useState } from 'react'
import { matteBlack } from '../constants/color'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AvatarCard from '../components/shared/Avatarcard'
import { sampleChats } from '../constants/sampleData'
import {Link} from '../components/styles/StyledComponents'

const Group = () => {

  const navigate = useNavigate();

  const chatId = useSearchParams()[0].get("group");
  console.log(chatId);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateBack = () => {
    navigate("/");
  }

  const handleMobile = () => {
    setIsMobileMenuOpen(prev => !prev);
  }

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  }

  const IconBtns = <>


    <Box sx={{
      display: {
        xs: "block",
        sm: "none"
      },
      position: "fixed",
      right: "1rem",
      top: "1rem",
    }}>

      <IconButton onClick={handleMobile}>

        <MenuIcon />

      </IconButton>

    </Box>

    <Tooltip title="Back">
      <IconButton sx={{
        position: "absolute",
        top: "2rem",
        left: "2rem",
        bgcolor: matteBlack,
        color: "white",
        "&:hover": {
          bgcolor: "rgba(0,0,0,0.7)"
        }
      }} onClick={navigateBack}>

        <KeyboardBackspaceIcon />

      </IconButton>
    </Tooltip>
  </>;

  return (
    <Grid container height={"100vh"} >
      <Grid
        size={{
          sm: 4,
        }}
        sx={{
          display: {
            xs: "none",
            sm: "block"
          }
        }}
        bgcolor={"#f5f5f5"}
        height={"100%"}
      >
        <GroupList myGroups={sampleChats} chatId={chatId}/>
      </Grid>

      <Grid size={{ xs: 12, sm: 8 }} height={"100%"} sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        padding: "1rem 3rem",
      }} >

        {IconBtns}

      </Grid>

      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose} sx={{
        display: {
          xs: "block",
          sm: "none"
        }
      }}>
        <GroupList w={"50vw"} myGroups={sampleChats} chatId={chatId}/>
      </Drawer>

    </Grid>
  )
}


const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack width={w}>
      {
        myGroups.length > 0 ?

          myGroups.map((myGroup) => {

            return <GroupListItem key={myGroup._id} group={myGroup} chatId={chatId} />

          })
          : <Typography variant="h6"
            sx={{ textAlign: "center", padding: "1rem", color: "gray" }}
          >
            No Groups
          </Typography>
      }
    </Stack>
  )
}

const GroupListItem = memo(({ group, chatId }) => {

  const { name, avatar, _id } = group

  return (
    <Link to={`?group=${_id}`} onClick={(e)=>{
      if(chatId === _id){
        e.preventDefault();
      }
    }}>

      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>

        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>

      </Stack>

    </Link>
  )
})


export default Group