import React, { useCallback, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
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
import {useSocketEvents} from "../../hooks/useSocketEvents.js"
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from '../../constants/event.js'
import { incrementNotifications, setNewMessagesAlert } from '../../redux/slices/chat.js'
import { getOrSaveFromLocalStorage } from '../../lib/feature.js'

//Higher Order Component - it is a function that returns a Component
const AppLayout = () => {

    return (WrappedComponent) => {
        return (props) => {

            const params = useParams();
            const chatId = params.chatId;
            const navigate = useNavigate();

            const socket = getSocket();

            // console.log(socket.id);

            const dispatch = useDispatch();

            const { isMobileMenu } = useSelector(state => state.misc)
            const { user } = useSelector(state => state.auth)
            const { newMessageAlert } = useSelector(state => state.chat)
            // console.log(isMobileMenu);

            //by just calling the useMyChatsQuery hook we are fetching the chats not need to call the trigger function
            const { isLoading, data, error, isError, refetch } = useMyChatsQuery("");

            useErrors([{ isError, error }]);


            useEffect(()=>{

                getOrSaveFromLocalStorage({key:NEW_MESSAGE_ALERT, value:newMessageAlert})

            }, [newMessageAlert])


            //printing the chats data fetched using useMyChatsQuery
            // console.log(data);

            const handleDeleteChat = (e, _id, groupChat) => {
                e.preventDefault();
                console.log("Delete Chat", _id, groupChat)
            }

            const handleMobileMenuClose = () => {
                dispatch(setIsMobileMenu(false));
            }


            const newMessageAlertHandler = useCallback((data)=>{

                //if chatId and received chatId is same then don't increment the notification
                if(chatId === data.chatId) return;

                dispatch(setNewMessagesAlert(data));

            }, [chatId]) //in the dependency array we are adding chatId so that it will only re-render when chatId changes as we are using chatId in the function for comparison


            const newRequestHandler = useCallback(()=>{
                dispatch(incrementNotifications());
            }, [])

            const refetchHandler = useCallback(()=>{
                navigate("/");
                refetch();  //refetching the chats using the useMyChatsQuery hook refetch function
            }, [navigate, refetch])

            //listening the event
            const eventHandler = {

                [NEW_MESSAGE_ALERT] : newMessageAlertHandler, 
                [NEW_REQUEST] : newRequestHandler,
                [REFETCH_CHATS] : refetchHandler 
            
            };

            useSocketEvents(socket , eventHandler);
            

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
                                    newMessagesAlert={newMessageAlert}
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
                                        newMessagesAlert={newMessageAlert}
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