// src/components/Chat.tsx

import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom'; 
import '../styles/Chat.css';

const socket: Socket = io('http://localhost:3000'); // Adjust the URL as needed

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const { channelId } = useParams<{ channelId: string }>();

  useEffect(() => {
    const handleMessage = (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.emit('join', channelId); // Notify server to join channel

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
      socket.emit('leave', channelId); // Notify server to leave channel
    };
  }, [channelId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { channelId, text: message });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat - {channelId}</h2>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
