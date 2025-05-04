export interface User {
  _id: string;
  name: string;
  mobileNumber: string;
  profilePic: string;
  about: string;
  isOnline?: boolean;
  lastMessage?: Message;
  unreadCount: number;
  messages?: Message[];
}

export interface Message {
  _id: string;
  content: string;
  sender: string;
  receiver: string;
  group?: string;
  timestamp: Date;
  isRead?: boolean;
}

export interface Group {
  _id: string;
  name: string;
  members: string[];
  admin: string;
  groupPic: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}