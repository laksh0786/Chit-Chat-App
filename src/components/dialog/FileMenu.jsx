import React from 'react'
import { Menu } from '@mui/material'

const FileMenu = ({anchorEl}) => {
  return (
    <Menu  anchorEl={anchorEl} open={false}>
        <div style={{width:'10rem'}}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt doloribus nihil eaque, ducimus officiis ex consequuntur sed saepe aliquid nobis?
        </div>
    </Menu>
  )
}

export default FileMenu