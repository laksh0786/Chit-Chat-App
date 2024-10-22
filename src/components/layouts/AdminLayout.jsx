import Grid from '@mui/material/Grid2'
import React, { useState } from 'react'
import { grayColor, matteBlack } from '../../constants/color'
import { Box, Drawer, IconButton, Stack, styled, Typography } from '@mui/material'
import { Close as CloseIcon, ManageAccounts as ManageAccountsIcon, Dashboard as DashboardIcon, Menu as MenuIcon, Groups as GroupsIcon, Message as MessageIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'
import { useLocation, Link as LinkComponent, Navigate } from 'react-router-dom'

//styled link component using styled from @mui/material
const Link = styled(LinkComponent)`
    text-decoration: none;
    border-radius: 2rem;
    padding: 1rem 2rem;
    color:black;
    &:hover{
        color:rgba(0,0,0,0.54)
    }
`;

//Admin Tabs
const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: <ManageAccountsIcon />
    },
    {
        name: "Chats",
        path: "/admin/chats",
        icon: <GroupsIcon />
    },
    {
        name: "Messages",
        path: "/admin/messages",
        icon: <MessageIcon />
    }
]


//Sidebar component
const SideBar = ({ w = "100%" }) => {

    const logoutHandler = () => {
        console.log("Logout");
    }


    const location = useLocation();

    return <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>

        <Typography variant="h5" textTransform={"uppercase"} align='center'>
            Chit Chat App
        </Typography>

        <Stack spacing={"1rem"} alignItems={"center"}>
            {
                adminTabs.map((tab) => {
                    return (
                        <Link key={tab.path} to={tab.path} sx={
                            location.pathname === tab.path && {
                                bgcolor: matteBlack,
                                width: "fit-content",
                                color: "white",
                                "&:hover": {
                                    color: grayColor
                                }
                            }
                        }>

                            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} sx={{}}>
                                {tab.icon}
                                <Typography>
                                    {tab.name}
                                </Typography>
                            </Stack>

                        </Link>
                    )
                })
            }

            <Link onClick={logoutHandler}>
                <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} sx={{}}>
                    {<ExitToAppIcon/>}
                    <Typography>
                        Logout
                    </Typography>
                </Stack>

            </Link>

        </Stack>

    </Stack>
}


const isAdmin = true;

const AdminLayout = ({ children }) => {

    const [isMobileOpen, setIsMobileOpen] = useState(true);

    if(!isAdmin){
        return <Navigate to="/admin" />
    }

    const handleMobile = () => {
        setIsMobileOpen(!isMobileOpen);
    }

    const handleClose = () => {
        setIsMobileOpen(false);
    }

    return (
        <Grid container minHeight={"100vh"} >

            <Box sx={{
                display: { xs: "block", md: "none" },
                position: "fixed",
                top: "1rem",
                right: "1rem",
            }}>
                <IconButton onClick={handleMobile}>
                    {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
            </Box>

            <Grid item="true" size={{ md: 4, lg: 3 }} sx={{
                display: { xs: "none", md: "block" },
            }}>
                <SideBar />
            </Grid>

            <Grid item="true" size={{ xs: 12, md: 8, lg: 9 }} sx={{
                bgcolor: grayColor,
            }} >
                {children}
            </Grid>

            <Drawer open={isMobileOpen} onClose={handleClose} sx={{
                display: { xs: "block", md: "none" },
            }}>
                <SideBar w="75vw" />
            </Drawer>

        </Grid>
    )
}

export default AdminLayout