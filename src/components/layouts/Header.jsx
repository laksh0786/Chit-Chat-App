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
import { useDispatch } from 'react-redux'
import { userNotExists } from '../../redux/slices/auth'

const SearchDialog = lazy(() => import('../specific/Search'));
const NotificationsDialog = lazy(() => import('../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../specific/NewGroup'));

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMobileView, setIsMobileView] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    const mobileViewHandler = () => {
        // console.log("Mobile View")
        setIsMobileView(prev => !prev);
    }

    const openSearchDialogHandler = () => {
        // console.log("Search Dialog");
        setIsSearch(prev => !prev);
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
            toast.error("Something went wrong");
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
                isSearch && (
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