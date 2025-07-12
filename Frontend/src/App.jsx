import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import EventPage from './pages/EventPage';
import Login from "./pages/Login"; 
import ChatPage from './pages/ChatPage';  // ✅ Use ChatPage, not ChatBox directly
import RecyclingPartnersPage from './pages/RecyclingPartnersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatPage />} />  {/* ✅ Chat page route */}
        <Route path="/partners" element={<RecyclingPartnersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
