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
      sendMessage(selectedUser._id, text);
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
        <div className="flex flex-col items-center justify-center h-full bg-[#f0f2f5]">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Chat</h2>
            <p className="text-gray-600 mb-4">Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;