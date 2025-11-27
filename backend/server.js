require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./db/mongo');
const { initializeSocket } = require('./services/socket.service');
const PORT = process.env.PORT || 3000;

connectDB();

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})