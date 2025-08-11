import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/intro-2.jpg";

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="text-gray-800 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background-color: white;
            overflow-x: hidden;
        }

        .animated-bg {
            animation: gradient-animate 15s ease infinite;
            background: linear-gradient(-45deg, #f0fff0, #e0f8e0, #c3e6cb, #b0d9b4);
            background-size: 400% 400%;
        }

        @keyframes gradient-animate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .feature-card {
            background-color: white;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .feature-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        }

        .fade-in {
            opacity: 0;
            animation: fadeIn 1s ease-in-out forwards;
        }

        .delay-1 { animation-delay: 0.5s; }
        .delay-2 { animation-delay: 1.0s; }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        .button-shadow {
            box-shadow: 0 4px 15px rgba(105, 177, 114, 0.4);
            transition: all 0.3s ease;
        }

        .button-shadow:hover {
            box-shadow: 0 6px 20px rgba(105, 177, 114, 0.6);
            transform: translateY(-2px);
        }

        @media (max-width: 640px) {
            h1 { font-size: 3rem !important; }
            h2 { font-size: 1.5rem !important; }
            .grid { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        }

        .reearth-green-700 { color: #348B3D; }
        .reearth-green-600 { background-color: #4A9C53; }
        .reearth-green-300 { border-color: #B0D9B4; }
        .hover-reearth-green-700:hover { background-color: #348B3D; }
      `}</style>

      <main
        className="relative min-h-screen flex flex-col justify-center items-center p-6"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-4xl w-full text-center fade-in">
          <h1 className="text-7xl font-bold reearth-green-700 mb-4 tracking-tight">
            ReEarth
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto font-light">
            Empowering communities to take action for a greener planet. Join
            events, track your impact, and contribute to a sustainable future
            with our tools.
          </p>

          <button
            onClick={() => {
              localStorage.setItem("hasSeenIntro", "true");
              window.location.reload(); // reload App to show AuthPage
            }}
            className="inline-block px-10 py-4 reearth-green-600 text-white font-semibold text-lg rounded-full button-shadow hover-reearth-green-700 transition-colors"
          >
            Let's Start
          </button>
        </div>

        {/* You can keep your features section here as is... */}
        <section className="max-w-6xl w-full mt-20 fade-in delay-1">
          <h2 className="text-3xl md:text-4xl font-bold reearth-green-700 mb-8 text-center">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card: Event Management */}
            <div className="feature-card p-6 rounded-xl border border-reearth-green-300">
              <div className="flex items-center mb-3">
                <svg
                  className="w-8 h-8 text-reearth-green-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Event Management
                </h3>
              </div>
              <p className="text-gray-600">
                Create and join environmental events, track volunteer needs, and
                log waste collected at each location.
              </p>
            </div>

            {/* Feature Card: Notifications */}
            <div className="feature-card p-6 rounded-xl border border-reearth-green-300">
              <div className="flex items-center mb-3">
                <svg
                  className="w-8 h-8 text-reearth-green-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Notifications
                </h3>
              </div>
              <p className="text-gray-600">
                Get timely reminders and updates on the day of events you've
                joined, so you never miss a chance to help.
              </p>
            </div>

            {/* Feature Card: Waste Predictor */}
            <div className="feature-card p-6 rounded-xl border border-reearth-green-300">
              <div className="flex items-center mb-3">
                <svg
                  className="w-8 h-8 text-reearth-green-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm0 2a3 3 0 013 3v2a2 2 0 002 2v5h-10v-5a2 2 0 002-2V7a3 3 0 013-3z"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Waste Predictor
                </h3>
              </div>
              <p className="text-gray-600">
                Use our ML-powered image classifier to identify and categorize
                different types of waste just by taking a photo.
              </p>
            </div>

            {/* Feature Card: Blog Page */}
            <div className="feature-card p-6 rounded-xl border border-reearth-green-300">
              <div className="flex items-center mb-3">
                <svg
                  className="w-8 h-8 text-reearth-green-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 2h8v6H6V6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Blog Page
                </h3>
              </div>
              <p className="text-gray-600">
                Read and create inspiring blog posts about sustainability,
                environmental efforts, and our community's impact.
              </p>
            </div>

            {/* Feature Card: AI Chatbot */}
            <div className="feature-card p-6 rounded-xl border border-reearth-green-300">
              <div className="flex items-center mb-3">
                <svg
                  className="w-8 h-8 text-reearth-green-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.11C2.564 12.352 2 11.127 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  AI Chatbot
                </h3>
              </div>
              <p className="text-gray-600">
                Get instant answers to your eco-questions, sustainability tips,
                and guidance on how to use the platform.
              </p>
            </div>

            {/* Feature Card: Recycling Partners */}
            <div className="feature-card p-6 rounded-xl border border-reearth-green-300">
              <div className="flex items-center mb-3">
                <svg
                  className="w-8 h-8 text-reearth-green-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H5zm0 14V4h10v12H5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Recycling Partners
                </h3>
              </div>
              <p className="text-gray-600">
                A dedicated page for local recycling partners with contact and
                location details.
              </p>
            </div>

            {/* Feature Card: Profile & Dashboard */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 feature-card p-6 rounded-xl border border-reearth-green-300 text-center">
              <div className="flex items-center justify-center mb-3">
                <svg
                  className="w-8 h-8 text-reearth-green-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Profile & Dashboard
                </h3>
              </div>
              <p className="text-gray-600">
                View your personal details, track your past events, see your
                logged waste, and visualize your impact with charts and graphs
                on your dashboard.
              </p>
            </div>
          </div>
        </section>
        <footer className="mt-16 text-center text-gray-400 fade-in delay-2">
          <p>&copy; 2025 ReEarth. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default IntroPage;
