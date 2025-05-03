export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    lastMessage?: Message;
    unreadCount: number;
    messages?: Message[];
  }
  
  export interface Message {
    id: string;
    text: string;
    timestamp: Date;
    sender: string;
    isRead: boolean;
  }