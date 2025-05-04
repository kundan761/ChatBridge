import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: { name: string; mobileNumber: string; password: string }) =>
    api.post('/users/register', data),
  login: (data: { mobileNumber: string; password: string }) =>
    api.post('/users/login', data),
  getProfile: () => api.get('/users/profile'),
  getAllUsers: () => api.get('/users/getAllUsers'),
};

export const messages = {
  send: (data: { sender: string; receiver: string; content: string }) =>
    api.post('/messages/send', data),
  getHistory: (userId: string, friendId: string) =>
    api.get(`/messages/history/${userId}/${friendId}`),
};

export const groups = {
  create: (data: { name: string; members: string[] }) =>
    api.post('/groups/create', data),
  addUser: (groupId: string, userId: string) =>
    api.put(`/groups/${groupId}/add`, { userId }),
};

export default api;