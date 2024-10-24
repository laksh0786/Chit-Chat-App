import { Container, Paper, Typography } from '@mui/material'
import React from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { matteBlack } from '../../constants/color'

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
    return (

        <Container sx={{
            height: "100vh"
        }}>

            <Paper elevation={3} sx={{
                padding: "1rem 4rem",
                borderRadius: "1rem",
                margin: "auto",
                width: "100%",
                overflow: "hidden",
                height: "100%",
                boxShadow: "none"
            }}>

                <Typography variant="h4" sx={{
                    textAlign: "center",
                    margin: "2rem",
                    textTransform: "uppercase"
                }}>
                    {heading}
                </Typography>

                <DataGrid rows={rows} columns={columns} rowHeight={rowHeight}
                    style={{
                        height: "80%",
                        width: "100%",
                    }}
                    sx={{
                        border: "none",
                        
                        ".table-header": {
                            bgcolor: matteBlack,
                            color: "white",
                        },

                        // Hide the resize icon (the grip bar at the right)
                        ".MuiDataGrid-columnSeparator": {
                            // display: "none !important",
                            color: "transparent",
                        }
                        
                    }}
                />

            </Paper>

        </Container>
    )
}

export default Table