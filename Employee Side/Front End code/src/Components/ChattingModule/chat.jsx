// src/Chat.js
import React, { useState, useEffect } from 'react';
import '../App.css';

const Chat = ({ chat, sendMessage }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chat.messages);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
