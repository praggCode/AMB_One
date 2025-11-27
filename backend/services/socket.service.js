const socketIo = require('socket.io');

let io;

module.exports.initializeSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join', (data) => {
            socket.join(data.userId);
            console.log(`User ${data.userId} joined room`);
        });

        socket.on('update-location', (data) => {
            // Broadcast location to specific room or user
            io.to(data.rideId).emit('receive-location', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

module.exports.sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}
