import React, { useState } from 'react';
import UserListItem from './UserListItem';
import { Search, X } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const UserList: React.FC = () => {
  const { users, selectedUser, selectUser, isMobile, setShowUserList } = useChat();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-[#f0f2f5] flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
        
        {/* Close button for mobile */}
        {isMobile && (
          <button 
            onClick={() => setShowUserList(false)} 
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {/* Search */}
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserListItem 
              key={user._id} 
              user={user} 
              isSelected={selectedUser?._id === user._id}
              onClick={() => {
                selectUser(user);
                if (isMobile) setShowUserList(false);
              }}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>No chats found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;