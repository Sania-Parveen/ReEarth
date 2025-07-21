// src/App.jsx
// import { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
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
// src/App.jsx
// src/App.jsx
// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import ChatPage from "./pages/ChatPage";
import RecyclingPartnersPage from "./pages/RecyclingPartnersPage";
import AuthPage from "./pages/AuthPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {!isAuthenticated ? (
        <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <div className="flex h-screen">
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
    </Router>
  );
};

export default App;
