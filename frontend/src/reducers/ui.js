import { createSlice } from '@reduxjs/toolkit';

const ui = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export default ui;