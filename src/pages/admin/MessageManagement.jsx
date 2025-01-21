import { useFetchData } from '6pp';
import { Avatar, Box, Skeleton, Stack } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import RenderAttachment from '../../components/shared/RenderAttachment';
import Table from '../../components/shared/Table';
import { server } from '../../constants/config';
import useErrors from "../../hooks/useErrors";
import { fileFormat, transformImage } from '../../lib/feature';

const columns = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 300
    },
    {
        field: "attachments",
        headerName: "Attachments",
        headerClassName: "table-header",
        width: 400,
        renderCell: (params) => {

            const { attachments } = params.row;

            return attachments?.length > 0 ?

                attachments.map((attachment, index) => {

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
                params.row.content !== "" ? params.row.content : "No Content"
            )
        }
    },
    {
        field: "sender",
        headerName: "Send By",
        headerClassName: "table-header",
        width: 280,
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
        width: 280
    },
    {
        field: "groupChat",
        headerName: "Group Chat",
        headerClassName: "table-header",
        width: 140
    },
    {
        field: "createdAt",
        headerName: "Time",
        headerClassName: "table-header",
        width: 250
    }
];

const MessageManagement = () => {

    const { data, loading, error } = useFetchData({
        url: `${server}/api/v1/admin/messages`,
        key: "dashboard-messages",
        credentials: "include"
    })

    // console.log(data);

    useErrors([
        {
            isError: error,
            error: error
        }
    ])

    const [rows, setRows] = useState([]);

    useEffect(() => {

        if (data) {
            setRows(data?.messages?.map((message) => {
                return {
                    ...message,
                    id: message._id,
                    sender: {
                        name: message.sender.name,
                        avatar: transformImage(message.sender.avatar, 50)
                    },
                    createdAt: moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
                }
            }))
        }

    }, [data])

    return (
        <AdminLayout>
            {
                loading
                    ? <Skeleton height={"100vh"}/>
                    : <Table heading={"All Messages"} rows={rows} columns={columns}  rowHeight={150}/>
            }
        </AdminLayout>
    )
}

export default MessageManagement