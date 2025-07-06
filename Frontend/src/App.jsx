import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./styles.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="app-container">
      <div className="card">
        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default App;
