import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { Add as AddIcon } from '@mui/icons-material';

const UserItem = ({ user, handler, handlerIsLoading }) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem
      sx={{
        bgcolor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for the card
        mb: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)', // Slightly enlarge on hover
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // Deeper shadow on hover
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} width="100%">
        <Avatar
          src={avatar}
          sx={{
            width: 48,
            height: 48,
            border: '2px solid #007aff', // Custom avatar border color
          }}
        />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: '#333',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          sx={{
            bgcolor: '#007aff',
            color: 'white',
            '&:hover': {
              bgcolor: '#005bb5',
            },
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
