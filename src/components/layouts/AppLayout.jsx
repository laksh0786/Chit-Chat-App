import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import Grid from '@mui/material/Grid2'
import ChatList from '../specific/ChatList'
import { sampleChats } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'

//Higher Order Component - it is a function that returns a Component
const AppLayout = () => {

    return (WrappedComponent) => {
        return (props) => {

            const params = useParams();
            const chatId = params.chatId;
            
            const handleDeleteChat = (e, _id, groupChat) => {
                e.preventDefault();
                console.log("Delete Chat", _id, groupChat)
            }

            return (
                <>
                    <Title />
                    <Header />

                    <Grid container height={"calc(100vh - 4rem)"} >

                        <Grid
                            size={{ sm: 4, md: 3 }}
                            sx={{
                                display: { xs: "none", sm: "block" },
                            }}
                            height={"100%"}
                        >
                            <ChatList 
                                chats={sampleChats} 
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                            />
                        </Grid>


                        <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height={"100%"} >
                            <WrappedComponent {...props} />
                        </Grid>

                        <Grid
                            size={{ md: 4, lg: 3 }}
                            height={"100%"}
                            sx={{
                                display: { xs: "none", md: "block" },
                                // padding:"2rem",
                                backgroundColor: "rgba(0,0,0,0.85)"
                            }} >
                            Third
                        </Grid>

                    </Grid>



                </>
            )

        }

    }

}

export default AppLayout