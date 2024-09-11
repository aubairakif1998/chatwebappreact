// src/components/ChannelSelector.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for React Router v6
import '../styles/ChannelSelector.css';

const ChannelSelector: React.FC = () => {
  const navigate = useNavigate(); // Use navigate instead of history

  const channels = ['General', 'Technology', 'Sports']; // Example channels

  const handleSelectChannel = (channel: string) => {
    navigate(`/chat/${channel}`); // Use navigate to change routes
  };

  return (
    <div className="channel-selector">
      <h2>Select a Channel</h2>
      {channels.map((channel) => (
        <button key={channel} onClick={() => handleSelectChannel(channel)}>
          {channel}
        </button>
      ))}
    </div>
  );
};

export default ChannelSelector;
