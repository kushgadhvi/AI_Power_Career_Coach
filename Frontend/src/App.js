import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import CareerCoach from "./CareerCoach";
import AnalysisPage from "./AnalysisPage";
import Layout from "./Layout";
import MockInterview from './MockInterview'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about-us"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/career-coach"
          element={
            <Layout>
              <CareerCoach />
            </Layout>
          }
        />
        <Route
          path="/analysis"
          element={
            <Layout>
              <AnalysisPage />
            </Layout>
          }
        />
          <Route
          path="/mock-interview"
          element={
            <Layout>
              <MockInterview />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
