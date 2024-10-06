import { KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material'
import { Box, Drawer, IconButton, Tooltip } from '@mui/material'
import Grid from '@mui/material/Grid2'
import React, { useState } from 'react'
import { matteBlack } from '../constants/color'
import { useNavigate } from 'react-router-dom'

const Group = () => {

  const navigate = useNavigate();

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
        Group List
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
        Group List
      </Drawer>

    </Grid>
  )
}




export default Group