/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const events = createSlice({
  name: 'events',
  initialState: {
    postedEvents: [],
    eventsOfTheDay: [],
    selectedDate: (new Date().toDateString())
  },
  reducers: {
    selectDate: (store, action) => {
      store.selectedDate = action.payload
      console.log('selectedDate i reducer', store.selectedDate)
    },
    setEvents: (store, action) => {
      store.postedEvents = action.payload
    },
    setEventsOfTheDay: (store, action) => {
      store.eventsOfTheDay = action.payload
    }
  }
});

export default events;

export const loadEvents = () => {
  return async (dispatch) => {
    // UPPDATERA TILL API SEN
    console.log('försöker hämta events')
    const URL = 'http://localhost:8080/event'
    try {
      const response = await fetch(URL);
      const data = await response.json()
      console.log('fetched data', data)
      dispatch(events.actions.setEvents(data.response))
    } catch (error) {
      console.error(error);
    } finally {
      console.log('hejhej')
    }
  }
}