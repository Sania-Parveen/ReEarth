// src/pages/ChatPage.jsx
import React from 'react';
import ChatBox from '../components/ChatBox';

function ChatPage() {
  return (
    <div className="w-full h-screen p-4 overflow-hidden bg-gradient-to-br from-blue-100 via-white to-green-100">
      <div className="w-full h-full bg-white shadow-lg rounded-2xl p-6 flex flex-col">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-2">
          ♻️ Recycle Assistant
        </h1>
        <p className="text-sm text-center text-gray-500 mb-4">
          Get instant tips on how to recycle waste responsibly.
        </p>
        <hr className="mb-4 border-gray-300" />
        <div className="flex-1 overflow-hidden">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
