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
// import Home from "./pages/Home";
// import EventPage from "./pages/EventPage";
// import ChatPage from "./pages/ChatPage";
// import RecyclingPartnersPage from "./pages/RecyclingPartnersPage";
// import AuthPage from "./pages/AuthPage";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       {!isAuthenticated ? (
//         <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
//       ) : (
//         <div className="flex h-screen">
//           <Sidebar />
//           <div className="flex flex-col flex-1 overflow-y-auto p-4">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/events" element={<EventPage />} />
//               <Route path="/partners" element={<RecyclingPartnersPage />} />
//               <Route path="/chat" element={<ChatPage />} />
//             </Routes>
//             <Footer />
//           </div>
//         </div>
//       )}
//     </Router>
//   );
// };

// export default App;

// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Pages
// import Home from './pages/Home';
// import Signup from './pages/Signup';
// import EventPage from './pages/EventPage';
// import Login from './pages/Login';
// import ChatPage from './pages/ChatPage';
// import RecyclingPartnersPage from './pages/RecyclingPartnersPage';
// import Profile from './pages/Profile';
// import Projects from './pages/Projects';
// import About from './pages/About';
// import BlogPage from './pages/BlogPage';

// // Components
// import Sidebar from './components/Sidebar';
// import Footer from './components/Footer';

// const App = () => {
//   const [isSignedUp, setIsSignedUp] = useState(true); // Set to false if you want to start with Signup

//   return (
//     <Router>
//       <>
//         {isSignedUp ? (
//           <div className="flex min-h-screen"> {/* Changed h-screen to min-h-screen */}
//             <Sidebar />

//             {/* Main Content Area */}
//             {/* Added flex-grow to ensure this div takes up available space and pushes footer down */}
//             <div className="flex flex-col flex-1">
//               {/* Content Area - flex-grow ensures content pushes footer down */}
//               <div className="flex-grow p-4">
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/events" element={<EventPage />} />
//                   <Route path="/partners" element={<RecyclingPartnersPage />} />
//                   <Route path="/chat" element={<ChatPage />} />
//                   <Route path="/project" element={<Projects />} />
//                   <Route path="/profile" element={<Profile />} />
//                   <Route path="/about" element={<About />} />
//                   <Route path="/blog" element={<BlogPage />} />
//                 </Routes>
//               </div>

//               {/* Footer is rendered here, now it will be pushed to the very bottom */}
//               <Footer />
//             </div>
//           </div>
//         ) : (
//           <Signup onSignupSuccess={() => setIsSignedUp(true)} />
//         )}
//       </>
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
import Signup from "./pages/Signup"; // Optional: fallback if you still use Signup
import EventPage from "./pages/EventPage";
import ChatPage from "./pages/ChatPage";
import RecyclingPartnersPage from "./pages/RecyclingPartnersPage";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import About from "./pages/About";
import BlogPage from "./pages/BlogPage";
import AuthPage from "./pages/AuthPage"; // Replaces Signup/Login combined

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {!isAuthenticated ? (
        <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar />

          {/* Main content area with footer pushed to bottom */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex-grow p-4">
>>>>>>> 9529acac71846535878e407e3a067fcbe5f13b06
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/partners" element={<RecyclingPartnersPage />} />
                <Route path="/chat" element={<ChatPage />} />
<<<<<<< HEAD
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
=======
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
>>>>>>> 9529acac71846535878e407e3a067fcbe5f13b06
    </Router>
  );
};

export default App;
