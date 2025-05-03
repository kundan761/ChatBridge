import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, User } from '../types';

// Sample data - in a real app this would come from your backend
const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    isOnline: true,
    unreadCount: 3,
    lastMessage: {
      id: '101',
      text: 'Can we meet tomorrow at 10am?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      sender: '1',
      isRead: false,
    },
    messages: [
      {
        id: '100',
        text: 'Hey, how are you?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        sender: 'current-user',
        isRead: true,
      },
      {
        id: '101',
        text: 'Can we meet tomorrow at 10am?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        sender: '1',
        isRead: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: true,
    unreadCount: 0,
    lastMessage: {
      id: '201',
      text: 'Thanks for your help!',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      sender: 'current-user',
      isRead: true,
    },
    messages: [
      {
        id: '200',
        text: 'I need help with the project',
        timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
        sender: '2',
        isRead: true,
      },
      {
        id: '201',
        text: 'Thanks for your help!',
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        sender: 'current-user',
        isRead: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Emily Chen',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    isOnline: false,
    unreadCount: 1,
    lastMessage: {
      id: '301',
      text: 'Did you see the new design?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      sender: '3',
      isRead: false,
    },
    messages: [
      {
        id: '300',
        text: 'Hey Emily, how is the design coming along?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        sender: 'current-user',
        isRead: true,
      },
      {
        id: '301',
        text: 'Did you see the new design?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        sender: '3',
        isRead: false,
      },
    ],
  },
  {
    id: '4',
    name: 'Michael Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    isOnline: true,
    unreadCount: 0,
    lastMessage: {
      id: '401',
      text: 'Let me know when you are free',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      sender: '4',
      isRead: true,
    },
    messages: [
      {
        id: '400',
        text: 'Can we have a call tomorrow?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // ~1 day ago
        sender: 'current-user',
        isRead: true,
      },
      {
        id: '401',
        text: 'Let me know when you are free',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        sender: '4',
        isRead: true,
      },
    ],
  },
  {
    id: '5',
    name: 'Jessica Williams',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    isOnline: false,
    unreadCount: 0,
    messages: [],
  },
];

interface ChatContextType {
  users: User[];
  selectedUser: User | null;
  selectUser: (user: User) => void;
  sendMessage: (userId: string, text: string) => void;
  markAsRead: (userId: string) => void;
  isMobile: boolean;
  showUserList: boolean;
  setShowUserList: (show: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserList, setShowUserList] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectUser = (user: User) => {
    setSelectedUser(user);
    markAsRead(user.id);
  };

  // Mark messages as read when selecting a user
  const markAsRead = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === userId) {
          const updatedMessages = user.messages?.map(message => ({
            ...message,
            isRead: true,
          }));
          
          return {
            ...user,
            unreadCount: 0,
            messages: updatedMessages,
            lastMessage: user.lastMessage ? { ...user.lastMessage, isRead: true } : undefined,
          };
        }
        return user;
      })
    );
  };

  // Send a new message
  const sendMessage = (userId: string, text: string) => {
    if (!text.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      sender: 'current-user',
      isRead: true,
    };

    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === userId) {
          const updatedMessages = [...(user.messages || []), newMessage];
          
          return {
            ...user,
            messages: updatedMessages,
            lastMessage: newMessage,
          };
        }
        return user;
      })
    );

    // If the user is currently selected, update the selectedUser state as well
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(prevSelectedUser => {
        if (!prevSelectedUser) return null;
        
        const updatedMessages = [...(prevSelectedUser.messages || []), newMessage];
        
        return {
          ...prevSelectedUser,
          messages: updatedMessages,
          lastMessage: newMessage,
        };
      });
    }
  };

  const value = {
    users,
    selectedUser,
    selectUser,
    sendMessage,
    markAsRead,
    isMobile,
    showUserList,
    setShowUserList,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};