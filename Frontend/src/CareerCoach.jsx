import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CareerCoach = () => {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState(""); // Text for job description
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  const handleAnalyze = async () => {
    if (files.length === 0 || !jobDescription) {
      alert("Please upload a resume and provide a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", files); // Add the file
    formData.append("job_post", jobDescription);
    const response = await axios.post("https://f53f-198-169-126-50.ngrok-free.app/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for FormData
      },
    });

    // Handle success
    // setResponse(response.data);
    // console.log("Response:", response.data);
    console.log(JSON.parse(response.data))

    navigate("/analysis", { state: JSON.parse(response.data) });
  };

  return (
    <Box sx={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Resume Upload Section */}
      <Box sx={{ margin: "40px auto", maxWidth: "500px" }}>
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #1976d2",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#e3f2fd",
          }}
        >
          {/* Input for file upload */}
          <input {...getInputProps()} />
          <Typography variant="h6">Click or Drag & Drop Your Resume Here</Typography>
          <Typography variant="body2">(Supported formats: .pdf, .docx)</Typography>
        </div>

        {/* Display Uploaded Files */}
        {files.length > 0 && (
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Uploaded Files:
            </Typography>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>

      {/* Job Description Textarea */}
      <Box sx={{ margin: "20px auto", maxWidth: "500px" }}>
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Paste Job Description
        </Typography>
        <textarea
          rows={5}
          style={{ width: "100%", padding: "10px", borderRadius: "8px", borderColor: "#1976d2" }}
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </Box>

      {/* Analyze Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          marginTop: "20px",
          padding: "10px 20px",
          fontWeight: "bold",
        }}
        onClick={handleAnalyze}
      >
        Analyze
      </Button>
    </Box>
  );
};

export default CareerCoach;
