import { Dialog, DialogTitle, InputAdornment, List, Pagination, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constants/sampleData';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearchModalOpen } from '../../redux/slices/misc';
import { useLazySearchUsersQuery } from '../../redux/api/api.rtk';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Search = () => {

  const { isSearchModalOpen } = useSelector((state) => state.misc);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //using the useLazySearchUsersQuery hook to search users
  //we get the trigger function from the hook to trigger the search query only then we get the data otherwise the data is not fetched
  const [searchUserTrigger] = useLazySearchUsersQuery();

  //search input field handling and validation using 6pp module useInputValidation
  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  let isLoadingSendFriendRequest = false;

  const addFriendHandler = (id) => {
    console.log('Add Friend', id);
  };

  const closeSearchModalHandler = () => {
    dispatch(setIsSearchModalOpen(false));
  }


  useEffect(() => {

    //this concept is called debouncing which means that the search query is triggered after a certain time interval using the setTimeout function.
    const timeoutId = setTimeout(() => {

      searchUserTrigger({name:search.value , page}).then(({ data, totalPages }) => {

        setUsers(data.users);
        setTotalPages(data.totalPages);

      }).catch((err) => {
        toast.error(err?.data?.message || "Failed to search users");
      })

    }, 400);

    //clearing the timeout so that the search query is not triggered multiple times when the user types in the search input field. it will only trigger after the user stops typing after 1 second.
    return () => {
      clearTimeout(timeoutId);
    }

  }, [search.value, page])



  return (
    <Dialog open={isSearchModalOpen} onClose={closeSearchModalHandler}>
      <Stack
        direction="column"
        sx={{
          p: 4, // shorthand for padding: '2rem'
          width: '30rem',
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
          onChange={(e)=>{
            search.changeHandler(e);
            setPage(1);
          }}
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


      <Pagination
        sx={{
          display: 'flex',
          justifyContent: 'end',
          m: 3,
          mt: 0,
        }}
        count={totalPages}
        page={page} 
        variant="outlined" color="primary"
        onChange={(e, pageNo) => {
          // console.log(pageNo);
          setPage(pageNo);
        }}
      />


    </Dialog>
  );
};

export default Search;
