/* eslint-disable linebreak-style */
import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    error: null
  },
  reducers: {
    setUserInfo: (store, action) => {
      store.userInfo = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setLoggedInUser: (store, action) => {
      store.userInfo = action.payload
    }
  }
});

export default user;