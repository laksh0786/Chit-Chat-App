import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'
import { Box, Container, Paper, Skeleton, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import useErrors from "../../hooks/useErrors"
import { useGetDashboardStatsQuery } from '../../redux/api/api.rtk'

const Dashboard = () => {

  const { data, isLoading, isError, error } = useGetDashboardStatsQuery("");
  const { stats } = data || {};

  console.log("Dashboard stats", stats)

  useErrors([{
    isError: isError,
    error: error
  }])

  // AppBar JSX element for search 
  const AppBar = (
    <Paper elevation={3} sx={{
      padding: "2rem",
      margin: {
        xs: "2.2rem 0",
        md: "0.7rem 0"
      },
      borderRadius: "1rem"
    }}>

      <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"} spacing={"1rem"} >

        <AdminPanelSettingsIcon sx={{
          fontSize: "3rem"
        }} />

        <SearchField type="text" placeholder='Search...' />

        <CurveButton>Search</CurveButton>

        <Box sx={{ flexGrow: 1 }} />

        <Typography sx={{
          display: {
            xs: "none",
            lg: "block"
          },
          color: "rgba(0,0,0,0.7)",
          textAlign: "center"
        }}>
          {/* {moment().format("dddd, Do MMMM YYYY")} */}
          {moment().format("Do MMMM YYYY")}
        </Typography>

        <NotificationsIcon />

      </Stack>

    </Paper>
  )

  // Widgets JSX element
  const Widgets = (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={"2rem"} sx={{
      justifyContent: "space-between",
      alignItems: "center",
      margin: "2rem 0"
    }}>

      <Widget title={"Users"} value={stats?.userCount || 0} Icon={<PersonIcon />} />
      <Widget title={"Chats"} value={stats?.totalChatsCount || 0} Icon={<GroupIcon />} />
      <Widget title={"Messages"} value={stats?.messageCount || 0} Icon={<MessageIcon />} />

    </Stack>
  )

  return (
    <AdminLayout>

      {isLoading
        ? <Skeleton height={"100vh"}/>
        : (
          <Container component={"main"}>

            {AppBar}

            <Stack direction={{
              xs: "column",
              lg: "row",
            }}
              flexWrap={"wrap"}
              justifyContent={"center"}
              alignItems={{
                xs: "center",
                lg: "stretch",
              }}
              sx={{ gap: "2rem" }}>

              <Paper elevation={3} sx={{
                padding: "2rem 3.5rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "45rem",
              }}>

                <Typography sx={{ margin: "0 0 1rem  0", fontSize: "1.8rem" }} variant='h4'>Last messages</Typography>

                <LineChart value={stats?.messagesChart || []} />

              </Paper>


              <Paper elevation={3} sx={{
                padding: "1rem ",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "100%", sm: "50%" },
                position: "relative",
                maxWidth: "25rem",
              }}>

                <DoughnutChart labels={["Single Chats", "Group Chats"]} value={[(stats?.totalChatsCount - stats?.groupCount) || 0, stats?.groupCount || 0]} />

                <Stack direction={"row"} spacing={"0.5rem"} sx={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}>
                  <GroupIcon /> <Typography>Vs</Typography>
                  <PersonIcon />
                </Stack>

              </Paper>

            </Stack>

            {Widgets}

          </Container>
        )
      }

    </AdminLayout>
  )
}


//React component for the widget
const Widget = ({ title, value, Icon }) => {
  return <Paper elevation={3} sx={{
    padding: "2rem",
    borderRadius: "1.5rem",
    margin: "2rem 0",
    width: "20rem",
  }}>

    <Stack spacing={"1rem"} sx={{
      alignItems: "center",
    }}>

      <Typography sx={{
        color: "rgba(0,0,0,0.8)",
        fontSize: "1.5rem",
        fontWeight: "bold",
        borderRadius: "50%",
        border: "4px solid rgba(0,0,0,0.9)",
        width: "5rem",
        height: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>{value}</Typography>

      <Stack direction={"row"} spacing={"1rem"} sx={{
        alignItems: "center",
      }}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>

    </Stack>

  </Paper>
}

export default Dashboard