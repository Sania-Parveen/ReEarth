import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function ChatBox() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! What type of waste do you want to recycle? ♻️' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/gemini/ask', {
        prompt: `Answer in a structured, clear and readable Markdown format using bullet points, bold for section titles, and short paragraphs. Here's the question: ${input}`
      });

      const botMessage = {
        from: 'bot',
        text: res.data.reply
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error fetching Gemini response:', err.message);
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: "⚠️ Sorry, I'm having trouble responding right now."
        }
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat area */}
      <div className="flex-1 bg-gray-100 rounded-xl p-4 shadow-inner overflow-y-auto space-y-2">
        <div className="text-center font-semibold text-green-600">🗣️ RecycleBot</div>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`px-4 py-2 text-sm rounded-lg shadow-sm max-w-2xl whitespace-pre-line ${
                msg.from === 'user'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              {msg.from === 'bot' ? (
                <div className="prose prose-sm prose-green">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-sm text-gray-500 animate-pulse">♻️ Typing...</div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask how to recycle plastic, e-waste, etc."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded-full text-sm hover:bg-green-700 transition disabled:opacity-50"
          disabled={!input.trim() || isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
