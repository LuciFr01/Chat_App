const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json());

app.use('/api/chats', chatRoutes);
app.use('/api/users', userRoutes);

// Socket.io configuration for real-time messaging
io.on('connection', (socket) => {
  console.log('New connection: ', socket.id);

  socket.on('joinRoom', ({ room }) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('chatMessage', (msg) => {
    io.to(msg.room).emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

