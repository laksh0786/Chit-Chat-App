import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { lightBlue, grayColor, orange } from '../../constants/color';
import moment from 'moment';

const MessageComponent = ({ message, user }) => {

    const { sender, content, attachments = [], createdAt } = message;

    const sameSender = sender?._id === user?._id;

    const timeAgo = moment(createdAt).fromNow();

    return (
        <div
            style={{
                alignSelf: sameSender ? 'flex-end' : 'flex-start',
                backgroundColor: sameSender ? orange : 'white',
                color: sameSender ? 'white' : 'black',
                borderRadius: sameSender ? '1.5rem 1.5rem 0 1.5rem' : '1.5rem 1.5rem 1.5rem 0',
                padding: '1rem',
                width: "fit-content",
                maxWidth: '60%',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '0.5rem',
            }}
        >
            {/* Sender Name */}
            {
                !sameSender && <Typography color={lightBlue} fontWeight={"600"} variant='caption'>
                    {sender.name}
                </Typography>
            }

            {/* Message Content */}
            {
                content && <Typography sx={{
                    wordWrap: 'break-word',
                    marginTop: sameSender ? 0 : '0.25rem',
                }}>
                    {content}
                </Typography>
            }

            {/* Attachments */}
            {/* You can add attachment rendering logic here if needed */}

            {/* Timestamp */}
            <Typography variant={"caption"} color="text.secondary" sx={{
                display: 'block',
                marginTop: '0.5rem',
                textAlign: 'right',
            }}>
                {timeAgo}
            </Typography>

        </div>
    )
}

export default memo(MessageComponent);
