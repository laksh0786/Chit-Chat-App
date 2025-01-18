import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import React, { memo, useEffect } from 'react'
import { sampleNotifications } from '../../constants/sampleData'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api.rtk'
import useErrors from "../../hooks/useErrors"
import { transformImage } from '../../lib/feature'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotificationModalOpen } from '../../redux/slices/misc'
import toast from 'react-hot-toast'

const Notifications = () => {

  const dispatch = useDispatch();
  const {isNotificationModalOpen} = useSelector(state => state.misc)

  const [acceptFriendRequestTrigger] = useAcceptFriendRequestMutation();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  //calling useError custom hook to handle errors
  useErrors([{ error, isError }]);


  const friendRequestHandler = async ({_id, accept}) => {

    dispatch(setIsNotificationModalOpen(false));

    try{

      const res = await acceptFriendRequestTrigger({ requestId: _id, accept });

      if(res.data?.success){

        // console.log("Socket require here");

        toast.success(res.data.message);

      } else{

        toast.error(res?.error?.data?.message || "Failed to handle your friend request");
        
      }
    } catch(err){

      toast.error(err?.message || "Something went wrong");
      console.log(err);

    }

  }

  const handleNotificationClose = ()=>{

    dispatch(setIsNotificationModalOpen(false));

  }


  return (
    <Dialog open={isNotificationModalOpen} onClose = {handleNotificationClose}>
      <Stack
        direction="column"
        p={{ xs: "1rem", sm: "2rem" }}
        sx={{
          maxWidth: '50rem',
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
          Notifications
        </DialogTitle>

        {
          isLoading ? <Skeleton /> : <>
            {
              data?.allRequests?.length > 0 ?
                data?.allRequests?.map((notification) => (
                  <NotificationsItem key={notification._id} notification={notification} handler={friendRequestHandler} />
                ))
                : <Typography sx={{ textAlign: "center" }}>No Notifications</Typography>
            }
          </>
        }

      </Stack>

    </Dialog>
  )
}


const NotificationsItem = memo(
  ({ notification, handler }) => {

    const { sender, _id } = notification;
    const { name, avatar } = sender;

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
            src={transformImage(avatar)}
            sx={{
              width: 48,
              height: 48,
              // border: '2px solid #007aff', // Custom avatar border color
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
            {`${name} sent you a friend request`}
          </Typography>


          <Stack direction={
            {
              xs: "column",
              sm: "row"
            }
          }>
            <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
            <Button color="error" onClick={() => handler({ _id, accept: false })}>Reject</Button>
          </Stack>


        </Stack>
      </ListItem>
    );

  }
)


export default Notifications