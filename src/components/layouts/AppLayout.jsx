import React, { useEffect } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import Grid from '@mui/material/Grid2'
import ChatList from '../specific/ChatList'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import { useMyChatsQuery } from '../../redux/api/api.rtk'
import { Drawer, Skeleton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsMobileMenu } from '../../redux/slices/misc'
import useErrors from '../../hooks/useErrors.js'
import { getSocket } from '../../socket.jsx'

//Higher Order Component - it is a function that returns a Component
const AppLayout = () => {

    return (WrappedComponent) => {
        return (props) => {

            const params = useParams();
            const chatId = params.chatId;

            const socket = getSocket();

            // console.log(socket.id);

            const dispatch = useDispatch();

            const { isMobileMenu } = useSelector(state => state.misc)
            const { user } = useSelector(state => state.auth)
            // console.log(isMobileMenu);

            //by just calling the useMyChatsQuery hook we are fetching the chats not need to call the trigger function
            const { isLoading, data, error, isError, refetch } = useMyChatsQuery("");

            useErrors([{ isError, error }]);

            //printing the chats data fetched using useMyChatsQuery
            // console.log(data);

            const handleDeleteChat = (e, _id, groupChat) => {
                e.preventDefault();
                console.log("Delete Chat", _id, groupChat)
            }

            const handleMobileMenuClose = () => {
                dispatch(setIsMobileMenu(false));
            }

            return (
                <>
                    <Title />
                    <Header />

                    {
                        isLoading ? (<Skeleton />) : (
                            <Drawer open={isMobileMenu} onClose={handleMobileMenuClose}>
                                <ChatList
                                    w="70vw"
                                    chats={data?.chats}
                                    chatId={chatId}
                                    handleDeleteChat={handleDeleteChat}
                                />
                            </Drawer>
                        )
                    }

                    <Grid container height={"calc(100vh - 4rem)"} >

                        <Grid
                            size={{ sm: 4, md: 3 }}
                            sx={{
                                display: { xs: "none", sm: "block" },
                            }}
                            height={"100%"}
                        >
                            {
                                isLoading ? (<Skeleton />) : (
                                    <ChatList
                                        chats={data?.chats}
                                        chatId={chatId}
                                        handleDeleteChat={handleDeleteChat}
                                    />
                                )
                            }
                        </Grid>


                        <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height={"100%"} >
                            <WrappedComponent {...props} chatId={chatId} />
                        </Grid>

                        <Grid
                            size={{ md: 4, lg: 3 }}
                            height={"100%"}
                            sx={{
                                display: { xs: "none", md: "block" },
                                padding: "2rem",
                                backgroundColor: "rgba(0,0,0,0.85)"
                            }} >

                            <Profile user={user} />

                        </Grid>

                    </Grid>



                </>
            )

        }

    }

}

export default AppLayout