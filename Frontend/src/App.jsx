
// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Components
// import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";

// // Pages
// import Home from "./pages/Home";
// import Signup from "./pages/Signup"; // Optional: fallback if you still use Signup
// import EventPage from "./pages/EventPage";
// import ChatPage from "./pages/ChatPage";
// import RecyclingPartnersPage from "./pages/RecyclingPartnersPage";
// import Profile from "./pages/Profile";
// import Projects from "./pages/Projects";
// import About from "./pages/About";
// import BlogPage from "./pages/BlogPage";
// import AuthPage from "./pages/AuthPage"; // Replaces Signup/Login combined

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       {!isAuthenticated ? (
//         <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
//       ) : (
//         <div className="flex min-h-screen">
//           <Sidebar />

//           {/* Main content area with footer pushed to bottom */}
//           <div className="flex flex-col flex-1 overflow-y-auto">
//             <div className="flex-grow p-4">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/events" element={<EventPage />} />
//                 <Route path="/partners" element={<RecyclingPartnersPage />} />
//                 <Route path="/chat" element={<ChatPage />} />
//                 <Route path="/project" element={<Projects />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/blog" element={<BlogPage />} />
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
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup"; // Optional
import EventPage from "./pages/EventPage";
import ChatPage from "./pages/ChatPage";
import RecyclingPartnersPage from "./pages/RecyclingPartnersPage";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import About from "./pages/About";
import BlogPage from "./pages/BlogPage";
import AuthPage from "./pages/AuthPage"; // Combined Signup/Login
import IntroPage from "./pages/IntroPage"; // 👈 Make sure the path is correct

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
