import React, { useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import { useChat } from '../../context/ChatContext';

const ChatWindow: React.FC = () => {
  const { selectedUser, sendMessage } = useChat();
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [selectedUser?.messages]);
  
  const handleSendMessage = (text: string) => {
    if (selectedUser) {
      sendMessage(selectedUser.id, text);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {selectedUser ? (
        <>
          <ChatHeader user={selectedUser} />
          
          <div className="flex-1 overflow-y-auto p-4 bg-[#e5ded8]">
            <MessageList messages={selectedUser.messages || []} />
            <div ref={messageEndRef} />
          </div>
          
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;