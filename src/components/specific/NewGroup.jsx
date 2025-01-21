import { useInputValidation } from '6pp'
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useCreateGroupMutation } from '../../redux/api/api.rtk'
import useErrors from '../../hooks/useErrors'
import { setIsNewGroupModalOpen } from '../../redux/slices/misc'
import toast from 'react-hot-toast'
import useAsyncMutation from '../../hooks/useAsyncMutation'

const NewGroup = () => {

  const {isNewGroupModalOpen} = useSelector(state=>state.misc)
  const dispatch = useDispatch();

  const { isError, isLoading, error, data} = useAvailableFriendsQuery();

  const [newGroupExecuteHandler, isNewGroupLoading] = useAsyncMutation(useCreateGroupMutation);

  // console.log(data);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {isError, error}
  ]

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((member) => member !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  // console.log(selectedMembers);

  const submitHandler = () => {

    if(!groupName.value){
      return toast.error("Group Name is required");
    }

    if(selectedMembers.length < 2 ){
      return toast.error("Select atleast 2 members");
    }

    // console.log("Group Created Succesfully ", groupName.value, selectedMembers);

    //create group mutation will be called usign the newGroupExecuteHandler
    newGroupExecuteHandler(`Creating Group ${groupName.value}`, {name: groupName.value, members: selectedMembers});


    // Close the modal after creating the group
    closeHandler();
  
  }

  const closeHandler = () => {
    dispatch(setIsNewGroupModalOpen(false));
  }

  return (
    <Dialog open={isNewGroupModalOpen} onClose={closeHandler}>
      <Stack
        spacing={"0.8rem"}
        direction="column"
        p={{ xs: "1rem", sm: "2rem" }}
        sx={{
          width: '25rem',
          backgroundColor: '#f5f5f5', // Light background for the dialog
          borderRadius: '12px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '2rem',
            color: '#333',
          }}
        >
          New Group
        </DialogTitle>

        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />

        <Typography variant='body1'>Members</Typography>

        <Stack>

          {isLoading ? <Skeleton height={"100vh"}/> : data?.friends?.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}

        </Stack>

        <Stack direction="row" spacing={"1rem"} justifyContent={"center"}>

          <Button variant='contained' color="error" onClick={closeHandler}>Cancel</Button>

          <Button variant='contained' onClick={submitHandler} disabled={isNewGroupLoading}>Create</Button>

        </Stack>

      </Stack>

    </Dialog>
  )
}

export default NewGroup