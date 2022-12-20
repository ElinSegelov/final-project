/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const events = createSlice({
  name: 'events',
  initialState: {
    postedEvents: [],
    eventsOfTheDay: [],
    selectedDate: (new Date().toString())
  },
  reducers: {
    selectDate: (store, action) => {
      store.selectedDate = action.payload
    },
    setEvents: (store, action) => {
      store.postedEvents = action.payload
    },
    setEventsOfTheDay: (store, action) => {
      const selectedDate = action.payload;
      console.log('selectedDate i reducer', selectedDate)
      store.eventsOfTheDay = store.postedEvents.filter(
        (event) => event.eventDate.includes('dec')
      )
    }
  }
});

export default events;

export const loadEvents = () => {
  return async (dispatch) => {
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
