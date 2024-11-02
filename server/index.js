const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const clientsRoutes = require('./routes/client.route');
const authRoutes = require('./routes/auth.route');
const categoryRoutes = require('./routes/category.route');
const jobRoutes = require('./routes/job.route');
const chatRoutes = require('./routes/chat.route');
const notficationRoutes = require('./routes/notification.route')
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const upload = require('./multerConfig'); // Import upload from multerConfig
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(cookieParser());

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/clients", clientsRoutes);
app.use("/", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/jobs", jobRoutes);
app.use('/chats', chatRoutes);
app.use("/notifications",notficationRoutes)

app.use(errorHandler);

// Create the HTTP server
const server = http.createServer(app);

// Initialize socket.io with CORS options
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Frontend URL
        methods: ['GET', 'POST']
    }
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for the user joining a specific chat room
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    // Listen for the user leaving a room
    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`User left room: ${roomId}`);
    });

    // Listen for new messages and broadcast them to the room
    socket.on('sendMessage', ({ chatId, message }) => {
        io.to(chatId).emit('receiveMessage', message); // Send message to all in the room
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Database connection
mongoose.connect(process.env.MONGOOSE_SECRET_KEY)
    .then(() => console.log('Connected to DB'))
    .catch(() => console.log('Connection Failed'));

// Start the server
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log('Server is running on port ' + port);
});
