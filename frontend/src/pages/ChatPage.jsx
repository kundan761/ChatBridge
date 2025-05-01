import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import UserList from '../components/UserList';
import '../styles/ChatPage.css';

const ChatPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log('Current User:', currentUser);

  return (
    <div className="chat-page">
      <Sidebar />
      <ChatWindow />
      <UserList />
    </div>
  );
};

export default ChatPage;

