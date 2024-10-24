import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Avatar, Box, Stack} from '@mui/material';
import Table from '../../components/shared/Table';
import { dashboardData } from '../../constants/sampleData';
import { fileFormat, transformImage } from '../../lib/feature';
import moment from 'moment';
import RenderAttachment from '../../components/shared/RenderAttachment';

const columns = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "attachments",
        headerName: "Attachments",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => {

            const {attachments} = params.row;

            return attachments?.length>0 ? 
            
            attachments.map((attachment , index)=>{

                const url = attachment.url;
                const file = fileFormat(url);

                return (
                    <Box key={`attachments-${index}`} marginTop={"1rem"}>
                        <a href={url} target="_blank" download style={{
                            color: "black",
                        }}>
                            {<RenderAttachment file={file} url={url} />}
                        </a>
                    </Box>
                )
            }) 
            
            : "No Attachments"
        }
    },
    {
        field: "content",
        headerName: "Content",
        headerClassName: "table-header",
        width: 400,
        renderCell: (params) => {
            return (
                params.row.content!=="" ? params.row.content : "No Content"
            )
        }  
    },
    {
        field: "sender",
        headerName: "Send By",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => {
            return (
                <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                    <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
                    <span>{params.row.sender.name}</span>
                </Stack>
            )
        }
    },
    {
        field: "chat",
        headerName: "Chat",
        headerClassName: "table-header",
        width: 220
    },
    {
        field: "groupChat",
        headerName: "Group Chat",
        headerClassName: "table-header",
        width: 100
    },
    {
        field: "createdAt",
        headerName: "Time",
        headerClassName: "table-header",
        width: 250
    }
];

const MessageManagement = () => {

    const [rows , setRows] = useState([]);

    useEffect(()=>{
        setRows(dashboardData.messages.map((message)=>{
            return {
                ...message,
                id:message._id,
                sender:{
                    name:message.sender.name,
                    avatar:transformImage(message.sender.avatar , 50)
                },
                createdAt:moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
            }
        }))
    } , [])

    return (
        <AdminLayout>
            <Table heading={"All Messages"} rows={rows} columns={columns} rowHeight={200}/>
        </AdminLayout>
    )
}

export default MessageManagement