import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedUser: null,
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setMessages, addMessage, selectUser } = chatSlice.actions;

export default chatSlice.reducer;
