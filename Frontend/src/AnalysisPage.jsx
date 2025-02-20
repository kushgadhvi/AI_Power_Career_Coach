import React, { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useLocation, useNavigate } from "react-router-dom";

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { missingSkills, suggestions, skillMatch, mockInterviewQuestions, formattingTips } = location.state;

  const [isModalOpen, setIsModalOpen] = useState(false);



  // Open Modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Back Button */}
      <Box sx={{ position: "absolute", top: "80px", left: "80px" }}>
        <IconButton
          onClick={() => navigate("/career-coach")}
          sx={{
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <ArrowBackIcon sx={{ color: "#1976d2" }} />
        </IconButton>
      </Box>

      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0d47a1", marginBottom: "20px" }}>
        Analysis Results
      </Typography>

      {/* Skill Match Visualization */}
      <Box sx={{ position: "relative", display: "inline-flex", marginBottom: "40px" }}>
        <CircularProgress
          variant="determinate"
          value={skillMatch}
          size={150}
          thickness={5}
          sx={{
            color: skillMatch >= 75 ? "#4caf50" : skillMatch >= 50 ? "#ffa726" : "#f44336",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: "#0d47a1" }}>
            {skillMatch}%
          </Typography>
        </Box>
      </Box>

      {/* Missing Skills Section */}
      <Typography variant="h5" sx={{ color: "#0d47a1", marginBottom: "20px", fontWeight: "bold" }}>
        Missing Skills
      </Typography>
      <List sx={{ marginBottom: "30px", maxWidth: "500px", width: "100%" }}>
        {missingSkills.map((skill, index) => (
          <ListItem key={index} sx={{ backgroundColor: "#e3f2fd", borderRadius: "8px", marginBottom: "10px" }}>
            <CheckCircleIcon sx={{ color: "#1976d2", marginRight: "10px" }} />
            <ListItemText primary={skill} />
          </ListItem>
        ))}
      </List>

      {/* Suggestions Section */}
      <Typography variant="h5" sx={{ color: "#0d47a1", marginBottom: "20px", fontWeight: "bold" }}>
        Suggestions
      </Typography>
      <List sx={{ marginBottom: "30px", maxWidth: "500px", width: "100%" }}>
        {suggestions.map((suggestion, index) => (
          <ListItem key={index} sx={{ backgroundColor: "#fbe9e7", borderRadius: "8px", marginBottom: "10px" }}>
            <CancelIcon sx={{ color: "#f44336", marginRight: "10px" }} />
            <ListItemText primary={suggestion} />
          </ListItem>
        ))}
      </List>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "10px 20px",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
          onClick={handleOpenModal}
        >
          Formatting Tips
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#1976d2",
            color: "#1976d2",
            padding: "10px 20px",
          }}
          onClick={() => navigate("/mock-interview", { state: mockInterviewQuestions })}
        >
          Start Mock Interview
        </Button>
      </Box>

      {/* Formatting Tips Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "#0d47a1" }}>Formatting Tips</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ borderRadius: "8px", overflow: "hidden" }}>
            <Table>
              <TableBody>
                {/* Do's */}
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Do's</TableCell>
                  <TableCell>
                    <List>
                      {formattingTips.do.map((tip, index) => (
                        <ListItem key={index}>
                          <CheckCircleIcon sx={{ color: "#4caf50", marginRight: "10px" }} />
                          <ListItemText primary={tip} />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                </TableRow>

                {/* Don'ts */}
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#ffebee" }}>Don'ts</TableCell>
                  <TableCell>
                    <List>
                      {formattingTips.dont.map((tip, index) => (
                        <ListItem key={index}>
                          <CancelIcon sx={{ color: "#f44336", marginRight: "10px" }} />
                          <ListItemText primary={tip} />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AnalysisPage;
