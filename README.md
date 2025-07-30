# CVR Gossips 🎭

A real-time anonymous messaging application where users can send messages to a common group chat room without revealing their identity.

## 🚀 Live Demo

**Try it now:** [https://anonymous-chat-1-esfu.onrender.com/](https://anonymous-chat-1-esfu.onrender.com/)

Click the link above to start chatting anonymously right away!

## Features

- **Complete Anonymity**: Users are automatically assigned random anonymous names (like "Silent Fox", "Mystery Cat", etc.)
- **Real-time Messaging**: Instant message delivery using WebSockets
- **User Count**: See how many people are currently online
- **Message History**: New users can see the last 100 messages
- **Join/Leave Notifications**: Anonymous notifications when users join or leave
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Modern, user-friendly interface
- **Connection Status**: Visual indication of connection status

## How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   npm start
   ```

3. **Open Your Browser**:
   - Navigate to `http://localhost:3000`
   - The application will automatically assign you an anonymous identity
   - Start chatting!

## How It Works

### Anonymous Identity System
- Each user gets a randomly assigned anonymous name and color
- No registration or login required
- No personal information is stored or tracked
- Users are identified only by their temporary session

### Message System
- Messages are broadcast to all connected users in real-time
- Each message shows the anonymous sender name and timestamp
- Messages are temporarily stored (last 100 messages) for new users joining
- No message persistence - messages are lost when server restarts

### Technical Stack
- **Backend**: Node.js with Express.js
- **Real-time Communication**: Socket.IO for WebSocket connections
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **UUID Generation**: For unique message and user identification

## File Structure

```
anonymous-chat-app/
├── server.js          # Main server file
├── package.json       # Project configuration
├── README.md          # This file
└── public/
    └── index.html     # Frontend application
```

## Customization

### Adding More Anonymous Names
Edit the `anonymousNames` array in `server.js`:

```javascript
const anonymousNames = [
    'Anonymous Owl', 'Silent Fox', 'Mystery Cat',
    // Add your own names here
];
```

### Changing Message Limit
Modify the `MAX_MESSAGES` constant in `server.js`:

```javascript
const MAX_MESSAGES = 100; // Change this number
```

### Styling
All CSS is contained in the `public/index.html` file. You can modify the styles in the `<style>` section.

## Security Features

- No user data collection
- No message logging to files
- Temporary message storage only
- No IP tracking or user identification
- Clean disconnect handling

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Local Development
```bash
npm start
```

### Production Deployment
1. Set the `PORT` environment variable if needed
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "anonymous-chat"
   ```

### Environment Variables
- `PORT`: Server port (default: 3000)

## Privacy Notice

This application is designed for anonymous communication. However:
- Messages are temporarily stored in server memory
- Server logs may contain connection information
- For complete privacy, consider hosting on your own server
- Messages are not encrypted in transit (consider adding HTTPS)

## Contributing

Feel free to fork this project and add your own features:
- Message encryption
- Room/channel support
- Image sharing
- Emoji reactions
- Admin moderation tools

## License

ISC License - Feel free to use and modify as needed.

---

Enjoy your anonymous conversations! 🎭✨
