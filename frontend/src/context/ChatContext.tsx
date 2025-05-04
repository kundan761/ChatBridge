import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { auth, messages } from '../services/api';
import { initSocket, getSocket, disconnectSocket } from '../services/socket';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import { User } from '../types';

interface ChatContextType {
  users: User[];
  selectedUser: User | null;
  selectUser: (user: User) => void;
  sendMessage: (userId: string, content: string) => void;
  markAsRead: (userId: string) => void;
  isMobile: boolean;
  showUserList: boolean;
  setShowUserList: (show: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserList, setShowUserList] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await auth.getAllUsers();
      const usersWithMessages = await Promise.all(
        data
          .filter((u: User) => u._id !== currentUser?._id)
          .map(async (user: User) => {
            if (currentUser) {
              const history = await messages.getHistory(currentUser._id, user._id);
              return {
                ...user,
                messages: history.data,
                lastMessage: history.data[history.data.length - 1],
                isOnline: false,
                unreadCount: 0,
              };
            }
            return user;
          })
      );
      setUsers(usersWithMessages);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const socket = initSocket(currentUser);

      // Load users
      fetchUsers();

      // Handle user status changes
      socket.on('userConnected', (userId: string) => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === userId ? { ...user, isOnline: true } : user
          )
        );
      });

      socket.on('userDisconnected', (userId: string) => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === userId ? { ...user, isOnline: false } : user
          )
        );
      });

      // Handle incoming messages
      socket.on('messageReceived', async (data: { senderId: string; content: string }) => {
        const { senderId, content } = data;
        
        // Update users list with new message
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === senderId
              ? {
                  ...user,
                  lastMessage: {
                    _id: 'temp-id', 
                    content,
                    sender: senderId,
                    receiver: currentUser._id,
                    timestamp: new Date(),
                    isRead: false,
                  },
                  unreadCount: (user.unreadCount || 0) + 1,
                }
              : user
          )
        );

        // If sender is selected user, update their messages
        if (selectedUser?._id === senderId) {
          const history = await messages.getHistory(currentUser._id, senderId);
          setSelectedUser(prev => 
            prev ? { ...prev, messages: history.data } : null
          );
        }
      });

      // Emit online status
      socket.emit('userStatus', { userId: currentUser._id, status: 'online' });

      return () => {
        socket.emit('userStatus', { userId: currentUser._id, status: 'offline' });
        disconnectSocket();
      };
    }
  }, [currentUser, fetchUsers, selectedUser?._id]);

  const selectUser = async (user: User) => {
    if (currentUser) {
      try {
        const history = await messages.getHistory(currentUser._id, user._id);
        setSelectedUser({ ...user, messages: history.data });
        markAsRead(user._id);
      } catch (error) {
        console.error('Failed to load chat history:', error);
        toast.error('Failed to load chat history');
      }
    }
  };

  const sendMessage = async (userId: string, content: string) => {
    if (!currentUser) return;

    try {
      const { data } = await messages.send({
        sender: currentUser._id,
        receiver: userId,
        content,
      });

      // Update UI immediately
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId
            ? {
                ...user,
                lastMessage: data,
                messages: [...(user.messages || []), data],
              }
            : user
        )
      );

      if (selectedUser?._id === userId) {
        setSelectedUser(prev =>
          prev
            ? {
                ...prev,
                messages: [...(prev.messages || []), data],
                lastMessage: data,
              }
            : null
        );
      }

      // Emit socket event
      const socket = getSocket();
      socket.emit('sendMessage', {
        senderId: currentUser._id,
        receiverId: userId,
        message: content,
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  const markAsRead = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === userId
          ? {
              ...user,
              unreadCount: 0,
              messages: user.messages?.map(msg => ({ ...msg, isRead: true })),
            }
          : user
      )
    );
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