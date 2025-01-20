import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { grayColor, matteBlack } from '../../constants/color';
import { Box, Drawer, IconButton, Stack, styled, Typography } from '@mui/material';
import { Close as CloseIcon, ManageAccounts as ManageAccountsIcon, Dashboard as DashboardIcon, Menu as MenuIcon, Groups as GroupsIcon, Message as MessageIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useLocation, Link as LinkComponent, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../redux/thunk/admin';

// Styled Link component using styled from @mui/material
const Link = styled(LinkComponent)(({ theme }) => ({
    textDecoration: 'none',
    borderRadius: '0.8rem',
    padding: '0.8rem 1.5rem',
    color: 'inherit',
    display: 'block',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    transition: 'background-color 0.3s ease',
}));

// Admin Tabs
const adminTabs = [
    {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: <DashboardIcon />,
    },
    {
        name: 'Users',
        path: '/admin/users',
        icon: <ManageAccountsIcon />,
    },
    {
        name: 'Chats',
        path: '/admin/chats',
        icon: <GroupsIcon />,
    },
    {
        name: 'Messages',
        path: '/admin/messages',
        icon: <MessageIcon />,
    },
];

// Sidebar component
const SideBar = ({ w = '100%' }) => {

    const dispatch = useDispatch();
    const location = useLocation();
    
    const logoutHandler = () => {
        dispatch(adminLogout());
    };

    return (
        <Stack
            width={w}
            direction="column"
            p={{ xs: '2rem 1.5rem', sm: '3rem 2rem' }}
            spacing={"3rem"}
            sx={{
                bgcolor: matteBlack,
                height: '100vh',
            }}
        >
            <Typography variant="h5" textTransform="uppercase" color="white">
                Chit Chat App
            </Typography>

            <Stack spacing={"1rem"}>
                {adminTabs.map((tab) => (
                    <Link
                        key={tab.path}
                        to={tab.path}
                        sx={{
                            bgcolor: location.pathname === tab.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            color: location.pathname === tab.path ? 'white' : 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '2rem',
                            padding: '1rem 2rem',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            },
                        }}
                    >
                        <Stack direction="row" spacing={"1rem"} alignItems="center">
                            {tab.icon}
                            <Typography>{tab.name}</Typography>
                        </Stack>
                    </Link>
                ))}

                <Link onClick={logoutHandler} sx={{
                    padding: '1rem 2rem',
                    bgcolor: 'transparent',
                    color: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }
                }}>
                    <Stack direction="row" spacing={"1rem"} alignItems="center">
                        <ExitToAppIcon />
                        <Typography>Logout</Typography>
                    </Stack>
                </Link>
            </Stack>
        </Stack>
    );
};


const AdminLayout = ({ children }) => {

    const { isAdmin } = useSelector(state => state.auth);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    if (!isAdmin) {
        return <Navigate to="/admin" />;
    }

    const handleMobile = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    const handleClose = () => {
        setIsMobileOpen(false);
    };

    return (
        <Grid container minHeight="100vh">

            {/* Mobile Toggle Button */}
            <Box
                sx={{
                    display: { xs: 'block', md: 'none' },
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
                }}
            >
                <IconButton onClick={handleMobile}>
                    {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
            </Box>

            {/* Sidebar for larger screens */}
            <Grid
                item="true"
                size={{ md: 4, lg: 3 }}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    bgcolor: matteBlack,
                    height: '100vh',
                    position: 'sticky',
                    top: 0,
                }}
            >
                <SideBar />
            </Grid>

            {/* Main content area */}
            <Grid
                item="true"
                size={{ xs: 12, md: 8, lg: 9 }}
                sx={{
                    bgcolor: grayColor,
                    p: '2rem',
                    height: '100vh',
                    overflowY: 'auto',
                }}
            >
                {children}
            </Grid>

            {/* Drawer for mobile */}
            <Drawer
                open={isMobileOpen}
                onClose={handleClose}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: '60vw',
                        bgcolor: matteBlack,
                    },
                }}
            >
                <SideBar />
            </Drawer>
        </Grid>
    );
};

export default AdminLayout;
