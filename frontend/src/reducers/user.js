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
      store.userInfo = action.payload;
    },
    pushEventToHostingEvents: (store, action) => {
      store.userInfo.hostingEvents.push(action.payload)
    }
  }
});

export default user;