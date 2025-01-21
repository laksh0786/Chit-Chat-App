import { Error as ErrorIcon } from '@mui/icons-material';
import { Container, Stack, Typography, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
        sx={{
          textAlign: "center",
          padding: 4,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          borderRadius: "12px",
        }}
      >
        <ErrorIcon
          sx={{
            fontSize: 60,
            color: "#f44336",
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "4rem", sm: "6rem" },
            color: "#333",
            fontWeight: "bold",
          }}
        >
          404
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: "#555",
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Oops! Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            fontSize: "1rem",
            maxWidth: "500px",
          }}
        >
          The page you're looking for doesn't exist or may have been moved. Try going back to the homepage.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            textTransform: "none",
            backgroundColor: "#3f51b5",
            "&:hover": {
              backgroundColor: "#2c387e",
            },
            color: "white",
            borderRadius: "8px",
            padding: "10px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          component={Link}
          to="/"
        >
          Go to Home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
