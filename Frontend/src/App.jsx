import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import EventReportPage from "./pages/EventReportPage";
import EventPage from "./pages/EventPage";
import ChatPage from "./pages/ChatPage";
import RecyclingPartnersPage from "./pages/RecyclingPartnersPage";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import About from "./pages/About";
import BlogPage from "./pages/BlogPage";
import AuthPage from "./pages/AuthPage";
import WastePredictor from "./pages/WastePredictor";
import UserDashboard from "./pages/UserDashboard";



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <Router>
      {!isAuthenticated ? (
        <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar
            onSignOut={() => {
              localStorage.removeItem("userId");
              setIsAuthenticated(false);
            }}
          />
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex-grow p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/partners" element={<RecyclingPartnersPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/project" element={<Projects />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/predict" element={<WastePredictor />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/report" element={<EventReportPage />} />

                
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
