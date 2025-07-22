
import React, { useEffect } from 'react';

const IntroPage = ({ onComplete }) => {
  useEffect(() => {
    // Set a timeout to call onComplete after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Display for 3 seconds

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [onComplete]); // Re-run effect if onComplete changes (unlikely here)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-emerald-600 text-white text-center p-4">
      <div className="animate-fade-in-scale">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to ReEarth <span role="img" aria-label="earth">🌍</span>
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl max-w-3xl leading-relaxed">
          Restoring Earth, one cleanup at a time.
        </p>
      </div>

      {/* Custom animations for the intro page */}
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default IntroPage;
