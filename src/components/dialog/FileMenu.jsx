import React, { forwardRef, useRef } from 'react';
import { ListItemText, Menu, MenuItem, MenuList, Paper, Tooltip, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFileMenuOpen, setUploadingLoader } from '../../redux/slices/misc';
import { AudioFileOutlined as AudioFileIcon, ImageOutlined as ImageIcon, UploadFileOutlined as UploadFileIcon, VideoFileOutlined as VideoFileIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useSendAttachmentsMutation } from '../../redux/api/api.rtk';

const FileMenu = ({ anchorEl, chatId }) => {

  const dispatch = useDispatch();
  const { isFileMenuOpen } = useSelector(state => state.misc);

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachmentsTrigger] = useSendAttachmentsMutation();

  const handleFileMenuClose = () => {
    dispatch(setIsFileMenuOpen(false));
  };

  const selectRef = (ref) => {
    ref.current?.click();
  }

  const fileChangeHandler = async (e, key) => {

    const files = Array.from(e.target.files);

    if (files.length <= 0) {
      return toast.error("No files selected");
    }

    if (files.length > 5) {
      return toast.error(`You can only upload 5 ${key} files at a time`);
    }

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${files.length} ${key} files.....`);

    handleFileMenuClose();

    //sending the files to the server
    try {

      const formData = new FormData();

      formData.append('chatId', chatId);

      files.forEach((file) => {
        formData.append("files", file);
      })

      const res = await sendAttachmentsTrigger(formData);

      if (res.data) {
        toast.success(`${key} sent successfully`, { id: toastId });
      }
      else {
        toast.error(`Failed to send ${key}`, { id: toastId });
      }

    }
    catch (err) {

      console.error(err);
      toast.error(err.message, { id: toastId });

    }
    finally {
      dispatch(setUploadingLoader(false));
    }

  };

  return (
    <Paper elevation={4} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Menu
        anchorEl={anchorEl}
        open={isFileMenuOpen}
        onClose={handleFileMenuClose}
        slotProps={{
          paper: {
            sx: {
              width: '14rem',
              borderRadius: '12px',
              backgroundColor: '#1e293b', // Dark theme background
              color: '#e2e8f0', // Light text color
            },
          }
        }}
      >
        <MenuList>

          <FileMenuItem icon={<ImageIcon sx={{ color: '#3b82f6' }} />} // Primary blue
            text="Image"
            keyItem="Images"
            ref={imageRef}
            accept="image/png, image/jpeg, image/jpg, image/gif"
            fileChangeHandler={fileChangeHandler}
            selectRef={selectRef}
          />

          <FileMenuItem icon={<AudioFileIcon sx={{ color: '#10b981' }} />} // Green
            text="Audio"
            keyItem="Audios"
            ref={audioRef}
            accept="audio/mpeg, audio/wav"
            fileChangeHandler={fileChangeHandler}
            selectRef={selectRef}
          />

          <FileMenuItem icon={<VideoFileIcon sx={{ color: '#f59e0b' }} />} // Amber
            text="Video"
            keyItem="Videos"
            ref={videoRef}
            accept="video/mp4, video/webm, video/ogg"
            fileChangeHandler={fileChangeHandler}
            selectRef={selectRef}
          />

          <FileMenuItem icon={<UploadFileIcon sx={{ color: '#6b7280' }} />} // Neutral gray
            text="File"
            keyItem="Files"
            ref={fileRef}
            accept="*"
            fileChangeHandler={fileChangeHandler}
            selectRef={selectRef}
          />

        </MenuList>

      </Menu>
    </Paper>
  );
};

//forwardRef is used to forward the ref to the underlying DOM element as it is not directly accessible in the component by just passing it as a prop. we have to pass two parameters one prop and other as ref
const FileMenuItem = forwardRef(
  ({ icon, text, keyItem, accept, fileChangeHandler, selectRef }, ref) => {
    return (
      <MenuItem
        onClick={() => selectRef(ref)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          padding: '0.8rem 1rem',
          borderRadius: '8px',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#334155', // Slightly lighter dark color
          },
        }}
      >
        <Tooltip title={text}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            {icon}
          </Box>
        </Tooltip>
        <ListItemText
          primary={text}
          sx={{
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#e2e8f0', // Light text color
          }}
        />
        <input
          type="file"
          multiple
          accept={accept}
          onChange={(e) => fileChangeHandler(e, keyItem)}
          style={{
            display: 'none',
          }}
          ref={ref}
          id={`file-upload-${keyItem}`}
        />
        <label htmlFor={`file-upload-${keyItem}`} style={{ marginLeft: 'auto', cursor: 'pointer', color: '#64748b' }}>
          Select
        </label>
      </MenuItem>
    );
  }
)

export default FileMenu;
