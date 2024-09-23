import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatBox from './components/ChatBox';
import Login from './components/Login';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (room) {
      socket.emit('joinRoom', { room });
    }
  }, [room]);

  return (
    <div className="App">
      {!user ? <Login setUser={setUser} /> : <ChatBox user={user} room={room} setRoom={setRoom} socket={socket} />}
    </div>
  );
}

export default App;
