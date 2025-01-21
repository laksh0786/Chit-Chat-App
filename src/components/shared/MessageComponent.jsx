import { Typography, Avatar, Stack, Box } from '@mui/material';
import React, { memo } from 'react';
import { lightBlue, orange } from '../../constants/color';
import moment from 'moment';
import { fileFormat } from '../../lib/feature';
import RenderAttachment from './RenderAttachment';
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {

    const { sender, content, attachments = [], createdAt } = message;
    const sameSender = sender?._id === user?._id;
    const timeAgo = moment(createdAt).fromNow();

    // console.log(attachments);

    // Generate avatar image URL using ui-avatars.com CDN
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(sender.name)}&background=${'2694ab'}&color=ffffff`;

    return (
        <motion.div initial= {sameSender ? {opacity:0, x:100} : {opacity:0, x:-100}}
        whileInView={{opacity:1, x:0}}>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: sameSender ? 'flex-end' : 'flex-start',
                    marginBottom: '0.5rem',
                    alignItems: 'flex-end',
                }}
            >
                {/* Only show Avatar for the other user */}
                {!sameSender && (
                    <Avatar src={avatarUrl} alt={sender.name} sx={{
                        width: 36,
                        height: 36,
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'
                    }} />
                )}

                {/* Message Bubble */}
                <div
                    style={{
                        backgroundColor: sameSender ? orange : 'white',
                        color: sameSender ? 'white' : 'black',
                        borderRadius: sameSender ? '1.5rem 1.5rem 0 1.5rem' : '1.5rem 1.5rem 1.5rem 0',
                        padding: '1rem',
                        width: "fit-content",
                        maxWidth: '60%',
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {/* Sender Name */}
                    {!sameSender && <Typography color={lightBlue} fontWeight={"600"} variant='caption'>
                        {sender.name}
                    </Typography>}

                    {
                        // Attachments
                        attachments.length > 0 && (
                            attachments.map((attachment, index) => {

                                const url = attachment.url;
                                const file = fileFormat(url);

                                return <Box key={index}>
                                    <a href={url} target="_blank" download style={{
                                        color: "black",
                                        margin: "0.5rem",
                                    }}>
                                        <RenderAttachment file={file} url={url} />
                                    </a>
                                </Box>

                            })
                        )
                    }

                    {/* Message Content */}
                    {content && <Typography sx={{
                        wordWrap: 'break-word',
                        marginTop: sameSender ? 0 : '0.25rem',
                    }}>
                        {content}
                    </Typography>}


                    {/* Timestamp */}
                    <Typography variant={"caption"} color="text.secondary" sx={{
                        display: 'block',
                        marginTop: '0.5rem',
                        textAlign: 'right',
                    }}>
                        {timeAgo}
                    </Typography>
                </div>
            </Stack>
        </motion.div>
    )
}

export default memo(MessageComponent);
