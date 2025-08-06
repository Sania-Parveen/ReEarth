import { useState } from "react";
import loginImage from "../assets/login-image.png"; // Keep your own image path
import { API } from "/api.js";

// Custom MessageBox component
const MessageBox = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center border border-green-300">
        <p className="text-lg font-medium text-gray-800 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 ease-in-out"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const AuthForm = ({ onAuthSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleForm = () => setIsSignup((prev) => !prev);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const closeMessage = () => setMessage("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isSignup ? API.SIGNUP : API.LOGIN;
    const payload = isSignup
      ? { ...form }
      : { email: form.email, password: form.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response from server");
      }

      if (res.ok) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.user?.name || form.name);
        onAuthSuccess(); // Navigate to dashboard or home
      } else {
        setMessage(data.error || "Authentication failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4 py-8">
      <div className="flex bg-white shadow-2xl rounded-xl overflow-hidden max-w-5xl w-full border border-green-200 transform transition-all duration-300 hover:scale-[1.01]">
        {/* Left Image Section */}
        <div className="w-1/2 hidden md:block">
          <img
            src={loginImage}
            alt="Eco Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-green-800 mb-6 text-center">
            {isSignup ? "Create Your Account" : "Welcome Back!"}
          </h2>
          <p className="text-md text-gray-600 mb-8 text-center">
            {isSignup
              ? "Join us to contribute to a greener planet."
              : "Login to continue your journey with ReEarth."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 text-gray-700"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 text-gray-700"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 text-gray-700"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition duration-300 ease-in-out transform ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
              }`}
            >
              {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="text-md text-center mt-6 text-gray-600">
            {isSignup ? "Already have an account?" : "New here?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-green-700 font-medium hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
      <MessageBox message={message} onClose={closeMessage} />
    </div>
  );
};

export default AuthForm;
