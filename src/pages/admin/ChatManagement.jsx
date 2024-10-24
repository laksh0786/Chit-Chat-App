import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import AvatarCard from '../../components/shared/AvatarCard';
import Table from '../../components/shared/Table';
import { dashboardData } from '../../constants/sampleData';
import { transformImage } from '../../lib/feature';

const columns=[
    {
        field:"id",
        headerName:"ID",
        headerClassName:"table-header",
        width:200
    }, 
    {
        field:"avatar",
        headerName:"Avatar",
        headerClassName:"table-header",
        width:150,
        renderCell:(params)=>{
            return (<AvatarCard avatar={params.row.avatar}  />)
        }
    },
    {
        field:"totalMembers",
        headerName:"Total Members",
        headerClassName:"table-header",
        width:120
    },
    {
        field:"members",
        headerName:"Members",
        headerClassName:"table-header",
        width:400,
        renderCell:(params)=>{
            return (
                <AvatarCard max={100} avatar={params.row.members}/>
            )
        }
    },
    {
        field:"totalMessages",
        headerName:"Total Messages",
        headerClassName:"table-header",
        width:120
    },
    {
        field:"creator",
        headerName:"Created By",
        headerClassName:"table-header",
        width:250,
        renderCell :(params) =>{
            return(
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>

                    <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
                    <span>{params.row.creator.name}</span>

                </Stack>
            )
        }
    } 
];

const ChatManagement = () => {

    const [rows, setRows] = useState([]);


    useEffect(() => {
        setRows(dashboardData.chats.map((chat)=>{
            return ({
                ...chat,
                id:chat._id,
                avatar:chat.avatar.map((avatar)=>{
                    return transformImage(avatar , 50)
                }),
                members:chat.members.map((member)=>{
                    return transformImage(member.avatar , 50)
                }),
                creator:{
                    name:chat.creator.name,
                    avatar:transformImage(chat.creator.avatar , 50)
                }

            })
        }))
    }, [])


    return (
        <AdminLayout>
            <Table heading={"All Chats"} rows={rows} columns={columns} />
        </AdminLayout>
    )
}

export default ChatManagement