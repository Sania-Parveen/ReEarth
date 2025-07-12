// File: ChatBox.jsx
import React, { useState, useRef, useEffect } from 'react';

function ChatBox() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Tell me what kind of waste you found 😊' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRecyclingTip = (waste) => {
    const tips = {
      plastic: '🔄 Plastic can be cleaned and sent to a recycling facility or reused for DIY crafts.',
      glass: '🔁 Glass should be rinsed and placed in blue bins. It can be melted and reused.',
      paper: '📄 Paper can be recycled into new paper products. Avoid recycling greasy paper.',
      metal: '🧲 Metals can be melted and reused. Separate aluminium and steel if possible.',
      e_waste: '⚠️ E-waste like batteries and electronics should be taken to special recycling points.'
    };
    return tips[waste.toLowerCase()] || "❓ Sorry, I don't have recycling info for that type yet.";
  };

  const handleSend = async (e) => { // Made handleSend async
    e.preventDefault();
    if (!input.trim() || isLoading) return; // Prevent sending if input is empty or loading

    const userMessage = { from: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message immediately
    setInput(''); // Clear input immediately

    setIsLoading(true); // Set loading to true

    // Simulate API call delay for bot response
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate 1 second delay

    const botResponse = getRecyclingTip(userMessage.text);
    const botMessage = { from: 'bot', text: botResponse };

    setMessages((prevMessages) => [...prevMessages, botMessage]); // Add bot message after delay
    setIsLoading(false); // Set loading to false
  };

  const handleClearInput = () => {
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-emerald-50 items-center justify-center p-4 font-sans">
      <div className="flex flex-col w-full max-w-2xl h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 text-center text-2xl font-bold shadow-md flex items-center justify-center gap-2">
          ♻️ RecycleBot Chat
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/800x600/?recycling,nature,green')" }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start ${ // Added items-start for icon alignment
                msg.from === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.from === 'bot' && ( // Bot icon changed to save earth like icon
                <div className="flex-shrink-0 mr-2 mt-1 text-3xl">
                  🌎
                </div>
              )}
              <div
                className={`p-3 rounded-lg max-w-[75%] shadow-md ${
                  msg.from === 'user'
                    ? 'bg-green-500 text-white transform translate-x-0 opacity-100'
                    : 'bg-blue-100 text-gray-800 transform translate-x-0 opacity-100'
                }`}
              >
                {msg.text}
              </div>
              {msg.from === 'user' && ( // User icon
                <div className="flex-shrink-0 ml-2 mt-1 text-3xl">
                  👤
                </div>
              )}
            </div>
          ))}
          {isLoading && ( // Loading indicator
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-gray-200 text-gray-600 max-w-[75%] shadow-md animate-pulse">
                Typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? "Bot is thinking..." : "Type your waste item here..."}
            className="flex-1 border border-gray-300 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          {input.length > 0 && (
            <button
              type="button"
              onClick={handleClearInput}
              className="bg-gray-300 text-gray-700 px-4 py-3 rounded-full hover:bg-gray-400 transition-colors duration-200 shadow-lg"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
