import React, { memo, useEffect, useState } from 'react';
import { matteBlack, lightGray, lightBlue as primaryColor, darkGray } from '../constants/color';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AvatarCard from '../components/shared/Avatarcard';
import { sampleChats } from '../constants/sampleData';
import { Link } from '../components/styles/StyledComponents';
import { Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Box, Drawer, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Group = () => {
  
  const navigate = useNavigate();

  // Get chatId from URL
  const chatId = useSearchParams()[0].get('group');
  console.log(chatId);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupNameUpdated, setGroupNameUpdated] = useState('');

  const navigateBack = () => navigate('/');

  const handleMobile = () => setIsMobileMenuOpen(prev => !prev);
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  // Update Group Name Handler
  const updateGroupName = () => {
    console.log("Group Name Updated to:", groupNameUpdated);
    setIsEdit(false);
  };

  // Get group name
  useEffect(() => {
    setGroupName(`Group ${chatId}`);
    setGroupNameUpdated(`Group ${chatId}`);

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

  return (
    <Grid container height="100vh">
      <Grid
        size={{ sm: 4 }}
        sx={{
          display: { xs: 'none', sm: 'block' },
          bgcolor: lightGray,
          height: '100%',
          padding: '1rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <GroupList myGroups={sampleChats} chatId={chatId} />
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
        {groupName && GroupName}
      </Grid>

      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <GroupList w="60vw" myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack width={w} spacing="1rem">
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
      style={{ textDecoration: 'none', width: '100%' }}
    >
      <Stack
        direction="row"
        spacing="1rem"
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
