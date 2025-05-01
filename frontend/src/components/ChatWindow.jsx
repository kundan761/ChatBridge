import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setMessages, addMessage } from '../redux/chatSlice';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { selectedUser, messages } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.user);
  const [newMessage, setNewMessage] = useState('');
  const userId =localStorage.getItem('userId');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages//history/${userId}/${selectedUser}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );
        dispatch(setMessages(response.data));
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser, dispatch]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/messages/send',
        {
          sender: currentUser._id,
          receiver: selectedUser,
          content: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(addMessage(response.data));
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (!selectedUser) {
    return (
      <div className="chat-window placeholder">
        <h2>Select a chat to start messaging</h2>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message) => (
          <div key={message._id}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
