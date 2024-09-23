import React, { useState, useEffect } from 'react';

function ChatBox({ user, room, setRoom, socket }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    const msg = { content: message, user: user.name, room };
    socket.emit('chatMessage', msg);
    setMessage('');
  };

  return (
    <div className="chat-box">
      <h2>Chat Room: {room}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
