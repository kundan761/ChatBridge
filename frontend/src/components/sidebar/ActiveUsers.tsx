import React from 'react';
import { User, Shield } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { useChat } from '../../context/ChatContext';

const ActiveUsers: React.FC = () => {
  const { users } = useChat();
  const onlineUsers = users.filter(user => user.isOnline);
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-[#f0f2f5] flex items-center">
        <User size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Active Now</h2>
      </div>
      
      {/* Active Users List */}
      <div className="flex-1 overflow-y-auto p-4">
        {onlineUsers.length > 0 ? (
          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Online - {onlineUsers.length}
            </h3>
            <div className="space-y-4">
              {onlineUsers.map(user => (
                <div key={user.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="relative">
                    <Avatar user={user} size="md" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-green-600">Active now</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>No active users</p>
          </div>
        )}
      </div>

      {/* Privacy Note */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-start text-xs text-gray-500">
          <Shield size={14} className="mr-2 flex-shrink-0 mt-0.5" />
          <p>Only people you've messaged can see when you're active.</p>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;