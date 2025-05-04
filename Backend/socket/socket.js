let onlineUsers = new Map();

const socketServer = (io) => {
  io.on('connection', (socket) => {
    // console.log('✅ New socket connected:', socket.id);

    // Handle user setup (login)
    socket.on('setup', (userData) => {
      socket.userId = userData._id; // Save user ID on socket instance
      onlineUsers.set(userData._id, socket.id);
      socket.join(userData._id);

      socket.emit('connected');
      io.emit('userConnected', userData._id); // Broadcast to all
      // console.log(`👤 User ${userData._id} is online`);
    });

    // Handle real-time direct messaging
    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('messageReceived', {
          senderId,
          content: message,
        });
        // console.log(`📨 Message sent from ${senderId} to ${receiverId}`);
      } else {
        // console.log(`❌ User ${receiverId} is offline`);
      }
    });

    // Handle real-time group messaging (optional)
    socket.on('sendGroupMessage', ({ groupId, senderId, content, members }) => {
      members.forEach((memberId) => {
        if (memberId !== senderId) {
          const memberSocketId = onlineUsers.get(memberId);
          if (memberSocketId) {
            io.to(memberSocketId).emit('groupMessageReceived', {
              groupId,
              senderId,
              content,
            });
          }
        }
      });
    });

    // Handle user manual status update (optional)
    socket.on('userStatus', ({ userId, status }) => {
      const event = status === 'online' ? 'userConnected' : 'userDisconnected';
      io.emit(event, userId);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      const userId = socket.userId;
      if (userId) {
        onlineUsers.delete(userId);
        io.emit('userDisconnected', userId); // Inform others
        // console.log(`❌ User ${userId} disconnected`);
      }
    });
  });
};

export default socketServer;
