import { useInputValidation } from '6pp'
import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'

const NewGroup = () => {

  const groupName = useInputValidation("");

  const [members , setMembers] = useState(sampleUsers);
  const [selectedMembers , setSelectedMembers] = useState([]);

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
    console.log("Group Created Succesfully " , groupName.value, selectedMembers);
  }

  const closeHandler = () => {
    console.log("Close Dialog"); 
  }

  return (
    <Dialog open onClose={closeHandler}>
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

          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}

        </Stack>

        <Stack direction="row" spacing={"1rem"} justifyContent={"center"}>

          <Button variant='contained' color="error">Cancel</Button>
          
          <Button variant='contained' onClick={submitHandler}>Create</Button>
        
        </Stack>

      </Stack>

    </Dialog>
  )
}

export default NewGroup