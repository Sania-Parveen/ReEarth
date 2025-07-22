<<<<<<< HEAD
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
=======
// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";

// // Pages
// import Home from "./pages/Home";
// import Signup from "./pages/Signup"; // Optional: fallback if you still use Signup
// import EventPage from "./pages/EventPage";
// import ChatPage from "./pages/ChatPage";
// import RecyclingPartnersPage from "./pages/RecyclingPartnersPage";
// import AuthPage from "./pages/AuthPage";

// // Protect routes unless userId is in localStorage
// const ProtectedRoute = ({ children }) => {
//   const userId = localStorage.getItem("userId");
//   return userId ? children : <Navigate to="/auth" replace />;
// };

// const App = () => {
//   const [isSignedUp, setIsSignedUp] = useState(
//     !!localStorage.getItem("userId")
//   );

//   useEffect(() => {
//     const checkAuth = () => {
//       setIsSignedUp(!!localStorage.getItem("userId"));
//     };
//     window.addEventListener("storage", checkAuth);
//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

//   return (
//     <Router>
//       <div className="flex h-screen">
//         {isSignedUp && <Sidebar />}

//         <div className="flex flex-col flex-1 overflow-y-auto p-4">
//           <Routes>
//             {/* Auth route - only unprotected page */}
//             <Route
//               path="/auth"
//               element={<AuthPage onAuthSuccess={() => setIsSignedUp(true)} />}
//             />

//             {/* Protected routes including Home */}
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/events"
//               element={
//                 <ProtectedRoute>
//                   <EventPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/partners"
//               element={
//                 <ProtectedRoute>
//                   <RecyclingPartnersPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/chat"
//               element={
//                 <ProtectedRoute>
//                   <ChatPage />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Catch-all fallback route */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>

//           <Footer />
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import ChatPage from "./pages/ChatPage";
import RecyclingPartnersPage from "./pages/RecyclingPartnersPage";
import AuthPage from "./pages/AuthPage";

const App = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {!isIntroComplete ? (
        <IntroPage onComplete={() => setIsIntroComplete(true)} />
      ) : !isAuthenticated ? (
        <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/partners" element={<RecyclingPartnersPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
            <Footer />
          </div>
        </div>
      )}
=======
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
>>>>>>> 382cb6b52551438c2c61e3a14993c2956ded1fe8
    </Router>
  );
};

export default App;
