import React, { useEffect } from 'react';
import UserList from '../sidebar/UserList';
import ChatWindow from '../chat/ChatWindow';
import ActiveUsers from '../sidebar/ActiveUsers';
import { useChat } from '../../context/ChatContext';
import { Menu } from 'lucide-react';

const Layout: React.FC = () => {
  const { isMobile, showUserList, setShowUserList } = useChat();

  // Reset sidebar visibility when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setShowUserList(true);
    }
  }, [isMobile, setShowUserList]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile menu button */}
      {isMobile && (
        <button 
          onClick={() => setShowUserList(true)} 
          className={`absolute top-3 left-3 z-30 p-2 rounded-full bg-white shadow-md text-gray-600 ${showUserList ? 'hidden' : 'flex'}`}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Left Sidebar - User List */}
      <div 
        className={`${isMobile ? 'absolute z-20 w-full md:w-80 lg:w-96 transition-transform duration-300 ease-in-out ' + 
          (showUserList ? 'translate-x-0' : '-translate-x-full') : 'w-80 lg:w-96'} 
          h-full bg-white border-r border-gray-200 flex-shrink-0`}
      >
        <UserList />
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col h-full bg-[#f0f2f5]">
        <ChatWindow />
      </div>

      {/* Right Sidebar - Active Users (hidden on mobile) */}
      {!isMobile && (
        <div className="w-64 lg:w-80 h-full bg-white border-l border-gray-200 flex-shrink-0 hidden md:block">
          <ActiveUsers />
        </div>
      )}
    </div>
  );
};

export default Layout;