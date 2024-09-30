import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {Face as FaceIcon , AlternateEmail as UserIcon , CalendarMonth as CalenderIcon} from "@mui/icons-material"
import moment from 'moment'

const Profile = () => {
    return (
        <Stack spacing={"2rem"} sx={{
            alignItems: "center",
        }}>
            <Avatar
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid white"
                }}
            />
            <ProfileCard heading="Bio" text="Hey there I am using Chit Chat App" />
            <ProfileCard heading="Username" text="laksh0786" Icon={<UserIcon/>}/>
            <ProfileCard heading="Name" text="Lakshay Bansal" Icon={<FaceIcon/>}/>
            <ProfileCard heading="Joined" text={moment('2024-09-03T04:53:23.230Z').fromNow()} Icon={<CalenderIcon/>}/>
        </Stack>
    )
}

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack direction={"row"}
        spacing={"1rem"}
        sx={{
            alignItems: "center",
            color: "white",
            textAlign: "center",
        }}
    >

        {Icon && Icon}  {/* if Icon is passed then render it and Icon is JSX element */}

        <Stack>

            <Typography variant='body1'>{text}</Typography>
            <Typography variant='caption' sx={{
                color: "gray"
            }}
            >
                {heading}
            </Typography>

        </Stack>

    </Stack>
)

export default Profile