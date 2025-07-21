import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



// Components
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';


// Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import EventPage from './pages/EventPage';
import Login from './pages/Login';
import ChatPage from './pages/ChatPage';
import RecyclingPartnersPage from './pages/RecyclingPartnersPage';
import WastePredictor from './pages/WastePredictor';  // ✅ Waste image prediction page
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(true);  // Toggle to false to test Signup screen

  return (
    <Router>
      <>
        {isSignedUp ? (
          <div className="flex h-screen">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-col flex-1 p-4 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/partners" element={<RecyclingPartnersPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/predict" element={<WastePredictor />} /> {/* ✅ Waste Classifier */}
                <Route path="/dashboard" element={<UserDashboard />} />
              </Routes>

              {/* Footer at the bottom */}
              <Footer />
            </div>
          </div>
        ) : (
          <Signup onSignupSuccess={() => setIsSignedUp(true)} />
        )}
      </>
    </Router>
  );
};

export default App;
