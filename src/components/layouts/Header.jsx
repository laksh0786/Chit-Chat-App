import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { orange } from '../../constants/color'
import React, { lazy, Suspense, useState } from 'react'
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Add as AddIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../constants/config'
import { userLogout } from '../../constants/apiEndpoints'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExists } from '../../redux/slices/auth'
import { setIsMobileMenu, setIsSearchModalOpen } from '../../redux/slices/misc'

const SearchDialog = lazy(() => import('../specific/Search'));
const NotificationsDialog = lazy(() => import('../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../specific/NewGroup'));

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isSearchModalOpen} = useSelector(state=>state.misc)

    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    const mobileViewHandler = () => {
        // console.log("Mobile View")
        dispatch(setIsMobileMenu(true));
    }

    const openSearchDialogHandler = () => {
        // console.log("Search Dialog");
        dispatch(setIsSearchModalOpen(true));
    }

    const openNewGroupHandler = () => {
        // console.log("New Group");
        setIsNewGroup(prev => !prev);
    }

    const openNotificationHandler = () => {
        // console.log("Notification");
        setIsNotification(prev => !prev);
    }

    const navigateToGroupHandler = () => {
        navigate("/groups");
    }

    const logoutHandler = () => {
        
        //manage logout
        axios.get(`${server}${userLogout}` , {withCredentials:true}).then(({data})=>{
            // console.log(data);
            toast.success(data.message);
            dispatch(userNotExists());
        }).catch((err)=>{
            // console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        })

    }

    return (
        <>

            <Box sx={{
                flexGrow: 1,
                height: "4rem"
            }}>

                <AppBar
                    position="static"
                    sx={{
                        bgcolor: orange,
                    }}
                >

                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                display: { xs: "none", sm: "block" }
                            }}
                        >
                            Chit Chat App
                        </Typography>

                        <Box sx={{
                            display: { xs: "block", sm: "none" }
                        }}>

                            <IconButton color='inherit' onClick={mobileViewHandler}>
                                <MenuIcon />
                            </IconButton>

                        </Box>

                        <Box>

                            <IconBtn
                                title="Search"
                                icon={<SearchIcon />}
                                onClick={openSearchDialogHandler}
                            />

                            <IconBtn
                                title="Create New Group"
                                icon={<AddIcon />}
                                onClick={openNewGroupHandler}
                            />

                            <IconBtn
                                title="Manage Groups"
                                icon={<GroupIcon />}
                                onClick={navigateToGroupHandler}
                            />

                            <IconBtn
                                title="Notifications"
                                icon={<NotificationsIcon />}
                                onClick={openNotificationHandler}
                            />

                            <IconBtn
                                title="Logout"
                                icon={<LogoutIcon />}
                                onClick={logoutHandler}
                            />

                        </Box>

                    </Toolbar>

                </AppBar>


            </Box >


            {
                isSearchModalOpen && (
                    <Suspense fallback={<Backdrop open />}>
                        <SearchDialog />
                    </Suspense>
                )
            }

            {
                isNotification && (
                    <Suspense fallback={<Backdrop open />}>
                        <NotificationsDialog />
                    </Suspense>
                )
            }


            {
                isNewGroup && (
                    <Suspense fallback={<Backdrop open />}>
                        <NewGroupDialog />
                    </Suspense>
                )
            }

        </>
    )
}

const IconBtn = ({ title, icon, onClick }) => {
    return (
        <Tooltip title={title}>
            <IconButton color='inherit' size="large" onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    )
}



export default Header