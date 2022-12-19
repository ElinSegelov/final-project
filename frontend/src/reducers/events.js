import { createSlice } from '@reduxjs/toolkit';

const events = createSlice({
  name: 'events',
  initialState: {
    items: []
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    }
  }
});

export default events