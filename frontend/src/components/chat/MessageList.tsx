import React from 'react';
import Message from './Message';
import { Message as MessageType } from '../../types';

interface MessageListProps {
  messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  // Group messages by date for date headers
  const groupedMessages: { [key: string]: MessageType[] } = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp);
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    
    groupedMessages[dateKey].push(message);
  });
  
  const formatDateHeader = (dateKey: string) => {
    const [year, month, day] = dateKey.split('-').map(Number);
    const date = new Date(year, month, day);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined 
      });
    }
  };
  
  return (
    <div className="space-y-4">
      {Object.entries(groupedMessages).map(([dateKey, dateMessages]) => (
        <div key={dateKey}>
          {/* Date header */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#e1f3fb] text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
              {formatDateHeader(dateKey)}
            </div>
          </div>
          
          {/* Messages for this date */}
          {dateMessages.map(message => (
            <Message key={message._id} message={message} />
          ))}
        </div>
      ))}
      
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-60 text-gray-500">
          <p>No messages yet</p>
          <p className="text-sm mt-2">Send a message to start the conversation</p>
        </div>
      )}
    </div>
  );
};

export default MessageList;