import React, { useState } from 'react';
import backgroundImage from '../assets/5.jpg'; // Import the background image

const Messages = () => {
  const [users] = useState(['Alice', 'Bob', 'Charlie']); // Sample user data
  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  // Assigning colors to each user
  const userColors = {
    Alice: '#ff5733',   // Red
    Bob: '#33c4ff',     // Light Blue
    Charlie: '#85e034'  // Green
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() && selectedUser) {
      setMessages([...messages, { user: selectedUser, text: messageInput, timestamp: new Date().toLocaleTimeString() }]);
      setMessageInput('');
    }
  };

  return (
    <div className="messages" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <h1>Messages</h1>
      <div className="user-list">
        {users.map(user => (
          <div key={user} className="user" onClick={() => setSelectedUser(user)}>
            {user}
          </div>
        ))}
      </div>
      <div className="chat-window">
        {selectedUser ? (
          <>
            <div className="messages-list">
              {messages.filter(msg => msg.user === selectedUser).map((msg, index) => (
                <div key={index} className="message" style={{ backgroundColor: userColors[msg.user] }}>
                  <span>{msg.user}: </span>
                  <span>{msg.text}</span>
                  <span className="timestamp">{msg.timestamp}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-input">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                className="message-input-field"
              />
              <button type="submit" className="send-button">Send</button>
            </form>
          </>
        ) : (
          <div className="no-chat">Select a user to start chatting!</div>
        )}
      </div>
    </div>
  );
};

export default Messages;
