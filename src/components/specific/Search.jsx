import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constants/sampleData';

const Search = () => {
  const search = useInputValidation();
  const [users, setUsers] = useState(sampleUsers);

  let isLoadingSendFriendRequest = false;

  const addFriendHandler = (id) => {
    console.log('Add Friend', id);
  };

  return (
    <Dialog open>
      <Stack
        direction="column"
        sx={{
          p: 4, // shorthand for padding: '2rem'
          width: '25rem',
          backgroundColor: '#f5f5f5', // Light background for the dialog
          borderRadius: '12px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#333',
          }}
        >
          Find People
        </DialogTitle>

        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          sx={{
            mb: 2,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)', // Light shadow for the input field
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <List sx={{ p: 2 }}>
        {users.map((user) => (
          <UserItem
            user={user}
            key={user._id}
            handler={addFriendHandler}
            handlerIsLoading={isLoadingSendFriendRequest}
          />
        ))}
      </List>
    </Dialog>
  );
};

export default Search;
