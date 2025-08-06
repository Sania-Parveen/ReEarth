// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Components
// import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";

// // Pages
// import Home from "./pages/Home";
// import EventReportPage from "./pages/EventReportPage";
// import EventPage from "./pages/EventPage";

// import ChatPage from "./pages/ChatPage";
// import RecyclingPartnersPage from "./pages/RecyclingPartnersPage";
// import Profile from "./pages/Profile";
// import Projects from "./pages/Projects";
// import About from "./pages/About";
// import BlogPage from "./pages/BlogPage";
// import AuthPage from "./pages/AuthPage";
// import WastePredictor from "./pages/WastePredictor";
// import UserDashboard from "./pages/UserDashboard";



// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   // Check localStorage on mount
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (userId) {
//       setIsAuthenticated(true);
//     }
//     setCheckingAuth(false);
//   }, []);

//   if (checkingAuth) {
//     return <div className="text-center p-10">Loading...</div>;
//   }

//   return (
//     <Router>
//       {!isAuthenticated ? (
//         <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
//       ) : (
//         <div className="flex min-h-screen">
//           <Sidebar
//             onSignOut={() => {
//               localStorage.removeItem("userId");
//               setIsAuthenticated(false);
//             }}
//           />
//           <div className="flex flex-col flex-1 overflow-y-auto">
//             <div className="flex-grow p-4">
//               <Routes>
//                 {/* <Route path="/intro" element={<IntroPage />} /> */}
//                 <Route path="/" element={<Home />} />
//                 <Route path="/events" element={<EventPage />} />
//                 <Route path="/partners" element={<RecyclingPartnersPage />} />
//                 <Route path="/chat" element={<ChatPage />} />
//                 <Route path="/project" element={<Projects />} />
//                 <Route path="/profile" element={<UserDashboard />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/blog" element={<BlogPage />} />
//                 <Route path="/predict" element={<WastePredictor />} />
//                 <Route path="/dashboard" element={<UserDashboard />} />
//                 <Route path="/report" element={<EventReportPage />} />

                
//               </Routes>
//             </div>
//             <Footer />
//           </div>
//         </div>
//       )}
//     </Router>
//   );
// };

// export default App;
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
        // Main container for the entire authenticated application
        // This div is now a flex column to stack content and footer vertically
        <div className="flex flex-col min-h-screen">
          {/* This div holds the sidebar and the main content area side-by-side */}
          <div className="flex flex-grow"> {/* flex-grow ensures this section takes available vertical space */}
            <Sidebar
              onSignOut={() => {
                localStorage.removeItem("userId");
                setIsAuthenticated(false);
              }}
            />
            {/* This div is the main content area that expands next to the sidebar */}
            {/* It's also a flex column to stack its own children (Routes wrapper) vertically */}
            <div className="flex flex-col flex-grow overflow-y-auto">
              {/* This div wraps the Routes and allows the content to push the footer down */}
              <div className="flex-grow p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/events" element={<EventPage />} />
                  <Route path="/partners" element={<RecyclingPartnersPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/project" element={<Projects />} />
                  <Route path="/profile" element={<UserDashboard />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/predict" element={<WastePredictor />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/report" element={<EventReportPage />} />
                </Routes>
              </div>
              {/* The Footer component is now removed from here */}
            </div>
          </div>
          {/* The Footer is now placed outside the sidebar/content flex container,
              making it span the full width of the screen. */}
          <Footer />
        </div>
      )}
    </Router>
  );
};

export default App;
