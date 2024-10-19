import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDialog = ({open , handleClose , deleteHandler , confirmText}) => {
  return (

    <Dialog open={open} onClose={handleClose}>

        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
            <DialogContentText>
                {confirmText}
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            
            <Button onClick={handleClose}>No</Button>
            
            <Button onClick={deleteHandler} color="error">Yes</Button>
        
        </DialogActions>
    
    </Dialog>
  )
}

export default ConfirmDialog