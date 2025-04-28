import Group from '../models/group.model.js';
import Message from '../models/message.model.js';

// @desc    Send a message
// @route   POST /api/messages/send
// @access  Private (User must be authenticated)
const sendMessage = async (req, res) => {
  const { sender, receiver, group, content } = req.body;

  try {
    const message = await Message.create({
      sender,
      receiver,
      group,
      content,
    });

    const io = req.io;

    res.status(201).json(message);

    setTimeout(async () => {
      if (group) {
        try {
          const groupData = await Group.findById(group).populate('members');
          
          groupData.members.forEach(member => {
            if (member._id.toString() !== sender) {
              io.to(member._id.toString()).emit('groupMessageReceived', {
                groupId: group,
                senderId: sender,
                content: content,
              });
            }
          });
        } catch (err) {
          console.error('Error emitting group message:', err);
        }
      } else if (receiver) {
        io.to(receiver).emit('messageReceived', {
          senderId: sender,
          content: content,
        });
      }
    }, 0);

  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message', error });
  }
};



// @desc    Get message history between two users
// @route   GET /api/messages/history/:userId/:friendId
// @access  Private (User must be authenticated)
const getMessageHistory = async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching message history', error });
  }
};

export{ sendMessage, getMessageHistory };
