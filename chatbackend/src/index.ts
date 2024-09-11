import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';  // Import the cors package
import authRoutes from './routes/auth'; // Adjust the path if necessary
import authenticateToken from './middleware/authMiddleware'; // Adjust the path if necessary
import connectToDatabase from './db'; // Import the connection function

const app = express();
const server = http.createServer(app);
app.use(express.json()); // Middleware to parse JSON bodies
// Connect to MongoDB
connectToDatabase();


const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST'],
  }
}); 
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
})); 
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
  



 
app.use('/api/auth', authRoutes); 
app.get('/protected', authenticateToken, (req : any, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});
 



io.on('connection', (socket: Socket) => {
  console.log('New client connected'); 

  socket.on('message', (message: string) => {
    console.log('Received message:', message);
    io.emit('message', message);  
  }); 

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});







// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
