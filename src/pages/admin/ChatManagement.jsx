import { useFetchData } from '6pp';
import { Avatar, Skeleton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import AvatarCard from '../../components/shared/AvatarCard';
import Table from '../../components/shared/Table';
import { server } from '../../constants/config';
import useErrors from '../../hooks/useErrors';
import { transformImage } from '../../lib/feature';

const columns = [
    {
        field: "id",  //field is the key of the object that we want to display in the table it should be the same as the key of the row object
        headerName: "ID",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "avatar", //field is the key of the object that we want to display in the table
        headerName: "Avatar",
        headerClassName: "table-header",
        width: 150,
        renderCell: (params) => {
            return (<AvatarCard avatar={params.row.avatar} />)
        }
    },
    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 300
    },
    {
        field: "groupChat",
        headerName: "Group",
        headerClassName: "table-header",
        width: 120
    },
    {
        field: "totalMembers",
        headerName: "Total Members",
        headerClassName: "table-header",
        width: 180
    },
    {
        field: "members",
        headerName: "Members",
        headerClassName: "table-header",
        width: 300,
        renderCell: (params) => {
            return (
                <AvatarCard max={100} avatar={params.row.members} />
            )
        }
    },
    {
        field: "totalMessages",
        headerName: "Total Messages",
        headerClassName: "table-header",
        width: 180
    },
    {
        field: "creator",
        headerName: "Created By",
        headerClassName: "table-header",
        width: 250,
        renderCell: (params) => {
            return (
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>

                    <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
                    <span>{params.row.creator.name}</span>

                </Stack>
            )
        }
    }
];

const ChatManagement = () => {

    //getting the usefetchdata hook from 6pp to fetch data - different types of data fetching is done in this project
    const { loading, error, data } = useFetchData({
        url: `${server}/api/v1/admin/chats`,
        key: "dashboard-chats",
        credentials: "include"
    });

    useErrors([{
        isError: error,
        error: error
    }])

    // console.log(data);

    const [rows, setRows] = useState([]);


    useEffect(() => {

        if (data) {
            setRows(data?.chats?.map((chat) => {
                return ({
                    ...chat,
                    id: chat._id,
                    avatar: chat.avatar.map((avatar) => {
                        return transformImage(avatar, 50)
                    }),
                    members: chat.members.map((member) => {
                        return transformImage(member.avatar, 50)
                    }),
                    creator: {
                        name: chat.creator.name,
                        avatar: transformImage(chat.creator.avatar, 50)
                    }
                })
            }))
        }

    }, [data])


    return (
        <AdminLayout>
            {
                loading ? <Skeleton height={"100vh"}/> : <Table heading={"All Chats"} rows={rows} columns={columns} />
            }
        </AdminLayout>
    )
}

export default ChatManagement