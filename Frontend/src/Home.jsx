import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/career-coach"); // Redirect to the Career Coach page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Welcome to Your AI Resume Coach
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "40px", maxWidth: "600px" }}>
        Our AI-powered platform is designed to help you analyze and enhance your resumes, match your skills to job
        descriptions, and prepare for mock interviews. Let’s get started on your journey to career success!
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "10px 20px",
          fontSize: "18px",
          fontWeight: "bold",
          borderRadius: "8px",
        }}
        onClick={handleStartClick}
      >
        Start
      </Button>
    </Box>
  );
};

export default Home;
