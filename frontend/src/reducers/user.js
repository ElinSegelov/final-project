import { createSlice } from '@reduxjs/toolkit';

const users = createSlice({
  name: 'users',
  initialState: {
    error: null,
    username: null,
    userId: null,
    accessToken: null
  },
  reducers: {
    setUserName: (store, action) => {
      store.username = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    }

  }
});

export default users;