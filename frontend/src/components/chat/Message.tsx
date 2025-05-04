import React from 'react';
import { Message as MessageType } from '../../types';
import { Check, CheckCheck } from 'lucide-react';
import { formatMessageTime } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { user: currentUser } = useAuth();
  const isSentByMe = message.sender === currentUser?._id;
  
  return (
    <div 
      className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div 
        className={`max-w-[70%] rounded-lg ${
          isSentByMe ? 'bg-[#dcf8c6] text-gray-800' : 'bg-white text-gray-800'
        } py-2 px-3 shadow-sm`}
      >
        <p className="text-sm mb-1">{message.content}</p>
        <div className={`flex items-center text-xs ${isSentByMe ? 'justify-end' : 'justify-start'} text-gray-500`}>
          <span>{formatMessageTime(new Date(message.timestamp))}</span>
          
          {isSentByMe && (
            <span className="ml-1 flex items-center">
              {message.isRead ? (
                <CheckCheck size={14} className="text-blue-500" />
              ) : (
                <Check size={14} />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;