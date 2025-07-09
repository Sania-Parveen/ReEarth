import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import EventPage from './pages/EventPage';
import Login from "./pages/Login"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Added route */}
      </Routes>
    </Router>
  );
}

export default App;
