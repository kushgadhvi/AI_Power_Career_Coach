import axios from "axios";

// Create an Axios instance with default configurations
const apiClient = axios.create({
  baseURL: "https://your-backend-api-url.com/api/v1", // Replace with your backend URL
  timeout: 10000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// API Service
const apiService = {
  /**
   * Upload files and job description to the backend
   * @param {File} resume - Resume file
   * @param {string} jobDescription - Job description text
   * @returns {Promise} - API response with skill match analysis
   */
  analyzeResume(resume, jobDescription) {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    return apiClient.post("/analyze", formData);
  },

  /**
   * Fetch job suggestions from the backend
   * @param {string} skills - Comma-separated list of skills
   * @returns {Promise} - API response with job suggestions
   */
  fetchJobSuggestions(skills) {
    return apiClient.get(`/job-suggestions?skills=${skills}`);
  },

  // Add more API methods as needed
  fetchFormattingTips() {
    return apiClient.get("/formatting-tips");
  },
};

export default apiService;
