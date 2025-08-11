import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import EventReportPage from "./pages/EventReportPage"; // ✅ From friend's app
import IntroPage from "./pages/introductionpages"; // ✅ From your app
import ChatPage from "./pages/ChatPage";
import RecyclingPartnersPage from "./pages/RecyclingPartnersPage";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import About from "./pages/About";
import BlogPage from "./pages/BlogPage";
import AuthPage from "./pages/AuthPage";
import WastePredictor from "./pages/WastePredictor";
import UserDashboard from "./pages/UserDashboard";
import NotificationPage from "./pages/NotificationPage"; // ✅ From your app

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Check localStorage on first render
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const introSeen = localStorage.getItem("hasSeenIntro");

    if (introSeen === "true") setHasSeenIntro(true);
    if (userId) setIsAuthenticated(true);

    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <Router>
      {!hasSeenIntro ? (
        <IntroPage
          onComplete={() => {
            localStorage.setItem("hasSeenIntro", "true");
            setHasSeenIntro(true);
          }}
        />
      ) : !isAuthenticated ? (
        <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <div className="flex flex-col min-h-screen">
          {/* Sidebar + Main Content */}
          <div className="flex flex-grow">
            <Sidebar
              onSignOut={() => {
                localStorage.removeItem("userId");
                setIsAuthenticated(false);
              }}
            />
            <div className="flex flex-col flex-grow overflow-y-auto">
              <div className="flex-grow p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/events" element={<EventPage />} />
                  <Route path="/partners" element={<RecyclingPartnersPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/project" element={<Projects />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/predict" element={<WastePredictor />} />
                  <Route path="/report" element={<EventReportPage />} />
                  <Route path="/notifications" element={<NotificationPage />} />
                  <Route path="/intro" element={<IntroPage />} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </Router>
  );
};

export default App;
