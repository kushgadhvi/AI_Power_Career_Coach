import React, { useState } from "react";
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate,useLocation } from "react-router-dom";

const MockInterview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const questions = [
        "Tell me about yourself.",
        "Why do you want this job?",
        "What are your strengths?",
        "What are your weaknesses?",
        "Where do you see yourself in five years?",
        "Why should we hire you?",
        "Tell me about a challenge you faced and how you handled it.",
        "What is your greatest achievement?",
        "How do you handle conflict at work?",
        "What are your salary expectations?",
    ];
    const   mockInterviewQuestions  = location.state;
    console.log(mockInterviewQuestions)
    const [answers, setAnswers] = useState(Array(questions.length).fill(""));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Box sx={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
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
            <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#1976d2" }}>
                Mock Interview
            </Typography>

            {mockInterviewQuestions.map((question, index) => (
                <Box key={index} sx={{ marginBottom: "20px" }}>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        {index + 1}. {question}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        placeholder="Your answer..."
                        value={answers[index]}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                </Box>
            ))}

            <Button
                variant="contained"
                sx={{ backgroundColor: "#1976d2", color: "white", padding: "10px 20px", fontWeight: "bold" }}
                onClick={handleSubmit}
            >
                Submit Answers
            </Button>

            {/* Modal for Warnings and Insights */}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Mock Interview Analysis</DialogTitle>
                <DialogContent>
                    <Typography variant="h6" sx={{ marginBottom: "10px", color: "#f44336" }}>
                        Warnings:
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Avoid vague answers like 'I don't know'." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Be concise and avoid rambling." />
                        </ListItem>
                    </List>
                    <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "10px", color: "#4caf50" }}>
                        Insights:
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Great use of specific examples to highlight achievements." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Confident answers that align with the job role." />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} variant="contained" sx={{ backgroundColor: "#1976d2", color: "white" }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MockInterview;
