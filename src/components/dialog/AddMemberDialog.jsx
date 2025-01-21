import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserItem from "../shared/UserItem"
import { lightGray } from '../../constants/color'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMemberModalOpen } from '../../redux/slices/misc'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api.rtk'
import useAsyncMutation from '../../hooks/useAsyncMutation'
import useErrors from '../../hooks/useErrors'

const AddMemberDialog = ({chatId }) => {

    const {isAddMemberModalOpen} = useSelector(state => state.misc);
    const dispatch = useDispatch();

    const {isLoading, data , error , isError} = useAvailableFriendsQuery(chatId);

    const [addGroupMembersTrigger, isLoadingAddMember] = useAsyncMutation(useAddGroupMembersMutation);

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

    const closeHandler = () => {
        dispatch(setIsAddMemberModalOpen(false));
    }

    //Add member submit Handler
    const submitHandler = () => {

        addGroupMembersTrigger("Adding Members....", {chatId, members: selectedMembers});
        
        closeHandler();
    }


    // console.log(data.friends);

    //error handling
    useErrors([{isError, error}]);

    return (
        <Dialog open={isAddMemberModalOpen} onClose={closeHandler}>

            <Stack bgcolor={lightGray} padding={"1rem"} width={{ xs: "20rem", sm: "27rem" }} spacing={"1.5rem"}>

                <DialogTitle textAlign={"center"} sx={{
                    padding: "0.4rem"
                }} fontWeight={'600'} fontSize={"1.8rem"}>Add Member</DialogTitle>

                <Stack spacing={"1rem"}>

                    {isLoading ? <Skeleton height={"100vh"}/> : data?.friends?.length > 0 ?
                        data?.friends?.map((user) => {
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