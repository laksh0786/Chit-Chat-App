import { Avatar, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import Table from '../../components/shared/Table';
import useErrors from "../../hooks/useErrors";
import { transformImage } from '../../lib/feature';
import { useGetAdminUserDataQuery } from '../../redux/api/api.rtk';


const columns = [
    {
        field: "id", //field is the key of the object that we want to display in the table it should be the same as the key of the object in the data array
        headerName: "ID",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "avatar",
        headerName: "Avatar",
        headerClassName: "table-header",
        width: 150,
        renderCell: (params) => {
            return (<Avatar alt={params.row.name} src={params.row.avatar} />)
        }
    },
    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "email",
        headerName: "Email",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "friends",
        headerName: "Friends",
        headerClassName: "table-header",
        width: 150
    },
    {
        field: "groups",
        headerName: "Groups",
        headerClassName: "table-header",
        width: 200
    }
];

const UserManagement = () => {

    const [rows, setRows] = useState([]);

    const { isLoading, data, isError, error } = useGetAdminUserDataQuery("");

    // console.log(data?.users);


    useErrors([
        { isError, error }
    ])


    useEffect(() => {

        if (data) {

            setRows(data.users.map((user) => {
                return {
                    ...user,
                    id: user._id,
                    avatar: transformImage(user.avatar, 50),
                }
            }))
        }

    }, [data])


    return (
        <AdminLayout>

            {
                isLoading ? <Skeleton height={"100vh"}/> : <Table heading={"All Users"} rows={rows} columns={columns} />
            }

        </AdminLayout>
    )
}

export default UserManagement