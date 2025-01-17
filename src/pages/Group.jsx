import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import { matteBlack, lightGray, lightBlue as primaryColor, darkGray, lightBlue, orange } from '../constants/color';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AvatarCard from '../components/shared/Avatarcard';
import LayoutLoader from "../components/layouts/LayoutLoader"
import { sampleChats, sampleUsers } from '../constants/sampleData';
import { Link } from '../components/styles/StyledComponents';
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Backdrop, Box, Button, Drawer, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import UserItem from '../components/shared/UserItem';
import { useGetMyGroupsQuery } from '../redux/api/api.rtk';
import useErrors from '../hooks/useErrors';

const ConfirmDeleteDialog = lazy(() => import('../components/dialog/ConfirmDeleteDialog'));
const AddMemberDialog = lazy(() => import('../components/dialog/AddMemberDialog'));

const isAddMember = false;

const Group = () => {

  const navigate = useNavigate();

  // Get chatId from URL eg /group?group=123 we get 123
  const chatId = useSearchParams()[0].get('group');

  const myGroups = useGetMyGroupsQuery('');
  // console.log(myGroups.data);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupNameUpdated, setGroupNameUpdated] = useState('');
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const navigateBack = () => navigate('/');

  const handleMobile = () => setIsMobileMenuOpen(prev => !prev);
  const handleMobileClose = () => setIsMobileMenuOpen(false);


  //senidng the error if there is any
  const errors = [
    { isError: myGroups.isError, error: myGroups.error },
  ]

  useErrors(errors);


  // Update Group Name Handler
  const updateGroupName = () => {
    console.log("Group Name Updated to:", groupNameUpdated);
    setIsEdit(false);
  };

  // Add Member Handler
  const openAddMemberHandler = () => {
    console.log("Add Member");
  };

  // opening the confirm delete dialog
  const openconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  //closing the confirm delete dialog
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  }

  // Delete Member Handler
  const deleteHandler = () => {
    console.log("Delete Group");
    closeConfirmDeleteHandler();
  };


  // Remove Member Handler
  const removeMemberHandler = (id) => {
    console.log("Remove Member", id);
  };

  // Get group name
  useEffect(() => {

    if (chatId) {
      setGroupName(`Group ${chatId}`);
      setGroupNameUpdated(`Group ${chatId}`);
    }

    // Clean the values if the chatId (chat group) changes
    return () => {
      setGroupName('');
      setGroupNameUpdated('');
      setIsEdit(false);
    };
  }, [chatId]);

  // Icon Buttons JSX element
  const IconBtns = (
    <>
      <Box sx={{
        display: { xs: 'block', sm: 'none' },
        position: 'fixed',
        right: '1.5rem',
        top: '1.5rem',
      }}>
        <IconButton onClick={handleMobile} sx={{ color: primaryColor }}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: 'absolute',
            top: '1.5rem',
            left: '1.5rem',
            bgcolor: matteBlack,
            color: 'white',
            borderRadius: '50%',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.8)',
            },
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  // Group Name JSX element
  const GroupName = (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"2rem"}>
      {isEdit ? (
        <>
          <TextField
            label="Group Name"
            value={groupNameUpdated}
            onChange={(e) => setGroupNameUpdated(e.target.value)}
            sx={{
              margin: "1rem",
              '& .MuiInputBase-root': {
                bgcolor: lightGray,
                borderRadius: '1rem',
              },
            }}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ color: darkGray, fontWeight: 'bold', marginBottom: '1rem' }}>
            {groupName}
          </Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  // Button Group JSX element
  const ButtonGroup = (
    <Stack direction={{
      xs: 'column-reverse',
      sm: 'row',
    }} spacing={"1rem"} p={{ xs: "0", sm: "1rem", md: "1rem 4rem" }}>

      <Button size="large" variant='outlined' color='error' startIcon={<DeleteIcon />} onClick={openconfirmDeleteHandler}>
        Delete Group
      </Button>

      <Button size="large" variant='contained' startIcon={<AddIcon />} onClick={openAddMemberHandler}>
        Add Member
      </Button>

    </Stack>
  )

  return myGroups.isLoading ? <LayoutLoader/> : (
    <Grid container height="100vh">
      <Grid
        size={{ sm: 4 }}
        sx={{
          display: { xs: 'none', sm: 'block' },
          bgcolor: "#d2f8fa",
          height: '100%',
          padding: '1rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px', // Width of the scrollbar
          },
          '&::-webkit-scrollbar-track': {
            background: "#d2f8fa", // Background of the scrollbar track
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: "rgba(151,231,225)", // Color of the scrollbar thumb
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: lightBlue, // Color of the scrollbar thumb on hover
          },
        }}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 8 }}
        height="100%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem',
          background: 'linear-gradient(180deg, #ffffff, #f1f1f1)',
        }}
      >
        {IconBtns}
        {groupName && <>

          {GroupName}

          <Typography sx={{
            margin: "1rem 4rem",
            alignSelf: 'flex-start',
            color: darkGray,
            variant: 'body1',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}>
            Members
          </Typography>

          <Stack
            sx={{
              maxWidth: "40rem",
              width: "100%",
              boxSizing: "border-box",
              padding: {
                xs: "1rem",
                sm: "1rem",
                md: "2rem 4rem",
              },
              spacing: "2rem",
              height: "55vh",
              overflow: "auto",
              bgcolor: "rgba(151,231,225 , 0.7)",
              borderRadius: "1rem",
              marginBottom: "1rem",
              '&::-webkit-scrollbar': {
                width: '8px', // Width of the scrollbar
              },
              '&::-webkit-scrollbar-track': {
                background: "#d2f8fa", // Background of the scrollbar track
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: "rgba(151,231,225)", // Color of the scrollbar thumb
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: lightBlue, // Color of the scrollbar thumb on hover
              },
            }}
          >

            {/* Member Card */}

            {
              sampleUsers.map((user) => {
                return < UserItem user={user} key={user._id} isAdded
                  styling={{
                    boxShadow: '0px 0px 0.5rem rgba(0, 0, 0, 0.2)',
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                    boxShadow: "0 0 0 0",
                  }}
                  handler={removeMemberHandler}
                />
              })
            }

          </Stack>

          {ButtonGroup}

        </>}
      </Grid>

      {
        isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog />
          </Suspense>
        )
      }

      {
        confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} confirmText={"Are you sure you want to delete this gorup?"} />
          </Suspense>
        )
      }

      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{ display: { xs: 'block', sm: 'none' }, bgcolor: "#d2f8fa" }}
      >
        <GroupList w="60vw" myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack width={w}>
      {myGroups.length > 0 ? (
        myGroups.map(myGroup => (
          <GroupListItem key={myGroup._id} group={myGroup} chatId={chatId} />
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', padding: '1rem', color: darkGray }}>
          No Groups
        </Typography>
      )}
    </Stack>
  );
};


const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={e => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
      style={{ textDecoration: 'none', width: '100%', padding: "0.6rem" }}
    >
      <Stack
        direction="row"
        spacing="2.5rem"
        alignItems="center"
        sx={{
          padding: '1rem',
          bgcolor: chatId === _id ? primaryColor : 'white',
          color: chatId === _id ? 'white' : 'black',
          borderRadius: '1rem',
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            bgcolor: '#f0f0f0',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            color: matteBlack,
          },
        }}
      >
        <AvatarCard avatar={avatar} />
        <Typography variant="body1" fontWeight="500">
          {name}
        </Typography>
      </Stack>
    </Link>
  );
});

export default Group;
