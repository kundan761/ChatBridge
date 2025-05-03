import React from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { User } from '../../types';
import { useChat } from '../../context/ChatContext';

interface ChatHeaderProps {
  user: User;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
  const { isMobile, setShowUserList } = useChat();
  
  return (
    <div className="px-4 py-2 bg-[#f0f2f5] border-b border-gray-200 flex items-center">
      {/* Back button on mobile */}
      {isMobile && (
        <button 
          onClick={() => setShowUserList(true)} 
          className="mr-2 text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      
      {/* User info */}
      <div className="flex items-center flex-1">
        <Avatar user={user} size="md" />
        <div className="ml-3">
          <h2 className="font-semibold text-gray-900">{user.name}</h2>
          <p className="text-xs text-gray-500">
            {user.isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center space-x-4">
        <button className="p-1 text-gray-600 hover:text-green-500 transition-colors">
          <Phone size={20} />
        </button>
        <button className="p-1 text-gray-600 hover:text-green-500 transition-colors">
          <Video size={20} />
        </button>
        <button className="p-1 text-gray-600 hover:text-green-500 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;