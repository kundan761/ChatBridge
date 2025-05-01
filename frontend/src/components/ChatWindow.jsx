import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addMessage } from '../redux/chatSlice.js';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { selectedUser, messages } = useSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${selectedUser}`);
      dispatch(addMessage(response.data));
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser, fetchMessages]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/messages/send', {
        sender: 'currentUserId', // Replace with current user's ID
        receiver: selectedUser,
        content: newMessage,
      });
      dispatch(addMessage(response.data));
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

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
