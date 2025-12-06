const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const pollRoutes = require('./routes/pollRoutes');
const userRoutes = require('./routes/userRoutes');
const { protect } = require('./middlewares/authMiddleware');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/polls', protect, pollRoutes);


const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', 
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('vote', (pollId) => {
    io.emit(`pollUpdate-${pollId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
