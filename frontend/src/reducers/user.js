/* eslint-disable linebreak-style */
import { createSlice } from '@reduxjs/toolkit';

const users = createSlice({
  name: 'users',
  initialState: {
    user: {},
    error: null
  },
  reducers: {
    setUser: (store, action) => {
      store.user = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    }
  }
});

export default users;