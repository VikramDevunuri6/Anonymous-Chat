const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Store active users and messages
const activeUsers = new Map();
const messages = [];
const MAX_MESSAGES = 100; // Limit stored messages

// Generate anonymous names
const anonymousNames = [
    'Anonymous Owl', 'Silent Fox', 'Mystery Cat', 'Hidden Wolf', 'Secret Bear',
    'Quiet Lion', 'Shadow Eagle', 'Unknown Tiger', 'Masked Panda', 'Stealth Deer',
    'Phantom Bird', 'Ghost Rabbit', 'Invisible Fish', 'Nameless Duck', 'Faceless Frog'
];

function getRandomAnonymousName() {
    return anonymousNames[Math.floor(Math.random() * anonymousNames.length)];
}

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Assign anonymous identity
    const userId = uuidv4();
    const anonymousName = getRandomAnonymousName();
    const userColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    
    activeUsers.set(socket.id, {
        id: userId,
        name: anonymousName,
        color: userColor,
        joinedAt: new Date()
    });

    // Send existing messages to new user
    socket.emit('previous-messages', messages);

    // Send current user count
    io.emit('user-count', activeUsers.size);

    // Notify others about new user (anonymously)
    socket.broadcast.emit('user-joined', {
        message: `${anonymousName} joined the chat`,
        timestamp: new Date()
    });

    // Handle new messages
    socket.on('send-message', (data) => {
        const user = activeUsers.get(socket.id);
        if (user && data.message && data.message.trim()) {
            const message = {
                id: uuidv4(),
                text: data.message.trim(),
                sender: user.name,
                senderColor: user.color,
                timestamp: new Date(),
                type: 'message'
            };

            // Add message to storage (keep only last MAX_MESSAGES)
            messages.push(message);
            if (messages.length > MAX_MESSAGES) {
                messages.shift();
            }

            // Broadcast message to all users
            io.emit('new-message', message);
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        const user = activeUsers.get(socket.id);
        if (user) {
            activeUsers.delete(socket.id);
            
            // Notify others about user leaving
            socket.broadcast.emit('user-left', {
                message: `${user.name} left the chat`,
                timestamp: new Date()
            });

            // Update user count
            io.emit('user-count', activeUsers.size);
        }
        console.log('User disconnected:', socket.id);
    });
});

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Anonymous chat server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to join the chat`);
});
