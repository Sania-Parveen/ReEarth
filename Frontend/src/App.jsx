import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import EventPage from './pages/EventPage';
import Login from "./pages/Login"; 

const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(false); // Track signup

  return (
    <>
      {isSignedUp ? (
        // Show main app after signup
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 ml-64 p-6 overflow-y-auto">
            <Home />
            <Footer />
          </div>
        </div>
      ) : (
        // Show signup first
        <Signup onSignupSuccess={() => setIsSignedUp(true)} />
      )}
    </>
  );
};

export default App;
