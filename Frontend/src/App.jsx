import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import EventPage from './pages/EventPage';
import Login from './pages/Login';
import ChatPage from './pages/ChatPage';
import RecyclingPartnersPage from './pages/RecyclingPartnersPage';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import About from './pages/About';
import BlogPage from './pages/BlogPage';

// Components
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(true); // Set to false if you want to start with Signup

  return (
    <Router>
      <>
        {isSignedUp ? (
          <div className="flex min-h-screen"> {/* Changed h-screen to min-h-screen */}
            <Sidebar />

            {/* Main Content Area */}
            {/* Added flex-grow to ensure this div takes up available space and pushes footer down */}
            <div className="flex flex-col flex-1">
              {/* Content Area - flex-grow ensures content pushes footer down */}
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
                </Routes>
              </div>

              {/* Footer is rendered here, now it will be pushed to the very bottom */}
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
