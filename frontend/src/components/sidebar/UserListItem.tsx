import React from 'react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { formatTime } from '../../utils/formatters';
import { User } from '../../types';

interface UserListItemProps {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, isSelected, onClick }) => {
  return (
    <div 
      className={`flex items-center py-3 px-4 cursor-pointer hover:bg-gray-100 transition-colors border-l-4 ${
        isSelected ? 'border-l-green-500 bg-gray-100' : 'border-l-transparent'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar user={user} size="md" />
        {user.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{user.name}</h3>
          <span className="text-xs text-gray-500">
            {user.lastMessage && formatTime(user.lastMessage.timestamp)}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500 truncate">
            {user.lastMessage?.text || 'No messages yet'}
          </p>
          
          {user.unreadCount > 0 && (
            <Badge count={user.unreadCount} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListItem;