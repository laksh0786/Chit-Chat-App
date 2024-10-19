import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from "../../constants/sampleData"
import UserItem from "../shared/UserItem"
import { lightGray } from '../../constants/color'

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);

    // console.log(selectedMembers);

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) => {
            if (prev.includes(id)) {
                return prev.filter((member) => member !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    //Add member submit Handler
    const submitHandler = () => {
        closeHandler();
    }

    const closeHandler = () => {
        setSelectedMembers([]);
        setMembers([]);
    }

    return (
        <Dialog open onClose={closeHandler}>

            <Stack bgcolor={lightGray} padding={"1rem"} width={{ xs: "20rem", sm: "27rem" }} spacing={"1.5rem"}>

                <DialogTitle textAlign={"center"} sx={{
                    padding: "0.4rem"
                }} fontWeight={'600'} fontSize={"1.8rem"}>Add Member</DialogTitle>

                <Stack spacing={"1rem"}>

                    {members.length > 0 ?
                        members.map((user) => {
                            return <UserItem key={user._id}
                                        user={user}
                                        handler={selectMemberHandler}
                                        isAdded={selectedMembers.includes(user._id)}
                                    />
                        })
                        : <Typography textAlign={"center"}>No Friends</Typography>
                    }

                </Stack>

                <Stack direction={"row"} spacing={"1rem"} sx={{
                    paddingTop: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                    <Button onClick={closeHandler} color='error' variant='outlined'>Cancel</Button>

                    <Button onClick={submitHandler} variant='contained' disabled={isLoadingAddMember}>Submit Changes</Button>

                </Stack>

            </Stack>

        </Dialog>
    )
}

export default AddMemberDialog