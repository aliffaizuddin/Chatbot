import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef(null);

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Add user's message
      setMessages([...messages, { text: input, sender: 'user' }]);
      setIsLoading(true);

      try {
        // Call backend
        const response = await axios.post('http://localhost:5000/chat', {
          message: input,
        });

        // Add bot response
        setMessages((prev) => [
          ...prev,
          { text: `Bot: ${response.data.reply}`, sender: 'bot' },
        ]);
      } catch (error) {
        // Handle errors (e.g., guardrail violations)
        setMessages((prev) => [
          ...prev,
          { text: `Error: ${error.response?.data?.error || 'Something went wrong'}`, sender: 'bot' },
        ]);
      }

      setInput('');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot">Bot is typing...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;