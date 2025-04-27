let onlineUsers = new Map();

const socketServer = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Receive user info after connection
    socket.on('setup', (userData) => {
      onlineUsers.set(userData._id, socket.id);
      socket.join(userData._id);
      socket.emit('connected');
      console.log('User setup done:', userData._id);
    });

    // Send a message
    socket.on('sendMessage', (data) => {
      const { senderId, receiverId, message } = data;
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('messageReceived', {
          senderId,
          message,
        });
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);

      // Remove user from onlineUsers map
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
};

export default socketServer;