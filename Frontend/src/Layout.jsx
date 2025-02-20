import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          CareerCoach
        </Typography>
        <Box>
          <Button component={Link} to="/" variant="text">
            Home
          </Button>
          <Button component={Link} to="/career-coach" variant="text">
            Career Coach
          </Button>
          <Button component={Link} to="/about-us" variant="text">
            About Us
          </Button>
          <Button component={Link} to="/contact-us" variant="text">
            Contact
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: "20px" }}>{children}</Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">© 2024 CareerCoach. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Layout;
