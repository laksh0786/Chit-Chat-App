import React, { memo } from 'react';
import { Link } from '../styles/StyledComponents';
import { Box, Stack, Typography } from '@mui/material';
import AvatarCard from './Avatarcard';

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat
}) => {
    return (
        <Link
            sx={{
                padding: 0,
                textDecoration: 'none',
                width: '100%',
            }}
            to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                padding: "1rem",
                backgroundColor: sameSender ? "#282828" : "#ffffff",
                color: sameSender ? "#ffffff" : "#000000",
                borderRadius: '8px',
                boxShadow: sameSender ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : '0px 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                position: "relative",
                cursor: "pointer",
                '&:hover': {
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
                },
            }}>

                {/* Avatar Card */}
                <AvatarCard avatar={avatar} />

                {/* Chat Info */}
                <Stack direction="column" justifyContent="center" flexGrow={1}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>{name}</Typography>

                    {newMessageAlert && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#ff4757",
                                fontSize: "0.8rem",
                                fontWeight: "500",
                            }}>
                            {newMessageAlert.count} New Message{newMessageAlert.count > 1 ? 's' : ''}
                        </Typography>
                    )}
                </Stack>

                {/* Online Indicator */}
                {isOnline && (
                    <Box
                        sx={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "green",
                            position: "absolute",
                            top: "50%",
                            right: "1rem",
                            transform: "translateY(-50%)",
                            boxShadow: '0 0 6px rgba(0, 128, 0, 0.6)',
                        }}
                    />
                )}

            </div>
        </Link>
    )
}

export default memo(ChatItem);
