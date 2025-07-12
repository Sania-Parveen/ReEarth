// File: ChatPage.jsx
import React from 'react';
import ChatBox from '../components/ChatBox';

function ChatPage() {
  return (
    <div className="min-h-screen bg-blue-50 p-4 flex justify-center items-start">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">♻️ Waste Recycle Assistant</h1>
        <ChatBox />
      </div>
    </div>
  );
}

export default ChatPage;
