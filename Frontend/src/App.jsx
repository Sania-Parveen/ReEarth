import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import EventPage from './pages/EventPage';
import Login from "./pages/Login"; 
import ChatPage from './pages/ChatPage';  // ✅ Use ChatPage, not ChatBox directly
import RecyclingPartnersPage from './pages/RecyclingPartnersPage';

const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(true); // Toggle signup/login screen

  return (
<<<<<<< HEAD
    <>
      {isSignedUp ? (
        <div className="flex h-screen">
          <Sidebar />

          {/* Main Content */}
          <div className="flex flex-col flex-1 p-4 overflow-y-auto">
            <Home />
            <Footer />
          </div>
        </div>
      ) : (
        <Signup onSignupSuccess={() => setIsSignedUp(true)} />
      )}
    </>
=======
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatPage />} />  {/* ✅ Chat page route */}
        <Route path="/partners" element={<RecyclingPartnersPage />} />
      </Routes>
    </Router>
>>>>>>> 73f13a992326f1d4fc9f095fcd4e34256ae96a67
  );
};

export default App;
