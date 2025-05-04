import React, { useState, KeyboardEvent } from 'react';
import { Smile, Paperclip, Mic, Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="p-3 bg-[#f0f2f5] border-t border-gray-200">
      <div className="flex items-center space-x-2">
        {/* Emoji button */}
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          <Smile size={24} />
        </button>
        
        {/* Attachment button */}
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          <Paperclip size={24} />
        </button>
        
        {/* Message input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full py-2 px-4 bg-white rounded-full text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        {/* Voice or send button */}
        {message.trim() ? (
          <button 
            onClick={handleSend}
            className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-full transition-colors"
          >
            <Send size={20} />
          </button>
        ) : (
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
            <Mic size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;