import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotifications } from '../../constants/sampleData'

const Notifications = () => {

  const friendRequestHandler = (_id, accept) => {
    console.log("Friend Request")
  }

  return (
    <Dialog open>
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
          sampleNotifications.length > 0 ?
            sampleNotifications.map((notification) => (
              <NotificationsItem key={notification._id} notification={notification} handler={friendRequestHandler} />
            ))
            : <Typography sx={{ textAlign: "center" }}>No Notifications</Typography>
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