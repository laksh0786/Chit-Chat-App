import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {Face as FaceIcon , AlternateEmail as UserIcon , CalendarMonth as CalenderIcon} from "@mui/icons-material"
import moment from 'moment'
import { transformImage } from '../../lib/feature'

const Profile = ({ user }) => {
    return (
        <Stack spacing={"2rem"} sx={{
            alignItems: "center",
        }}>
            <Avatar
                src={transformImage(user?.avatar?.url)}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid white"
                }}
            />
            <ProfileCard heading="Bio" text={user?.bio} />
            <ProfileCard heading="Username" text={user?.email} Icon={<UserIcon/>}/>
            <ProfileCard heading="Name" text={user?.name} Icon={<FaceIcon/>}/>
            <ProfileCard heading="Joined" text={moment(user?.createdAt).fromNow()} Icon={<CalenderIcon/>}/>
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