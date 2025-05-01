import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    allUsers: [],
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setCurrentUser, setAllUsers } = userSlice.actions;

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/users/getAllUsers', {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setAllUsers(response.data));
  } catch (error) {
    console.error('Error fetching all users:', error);
  }
};

export default userSlice.reducer;
