import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import EventPage from './pages/EventPage';
import Login from "./pages/Login"; 

const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(true); // Toggle signup/login screen

  return (
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
  );
};

export default App;
