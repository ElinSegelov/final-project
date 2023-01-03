/* eslint-disable quote-props */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const events = createSlice({
  name: 'events',
  initialState: {
    postedEvents: [],
    eventsOfTheDay: [],
    selectedGameWithDataFromAPI: {},
    selectedDate: (new Date().toISOString())
  },
  reducers: {
    selectDate: (store, action) => {
      store.selectedDate = action.payload
    },
    setEvents: (store, action) => {
      store.postedEvents = action.payload
    },
    setEventsOfTheDay: (store, action) => {
      store.eventsOfTheDay = action.payload
    },
    setSelectedGameWithDataFromAPI: (store, action) => {
      store.selectedGameWithDataFromAPI = action.payload
    }
  }
});

export default events;

export const loadEvents = (accessToken) => {
  return async (dispatch) => {
    // UPPDATERA TILL API SEN
    const URL = 'http://localhost:8080/event'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }
    try {
      const response = await fetch(URL, options);
      const data = await response.json()
      console.log('fetched data', data)
      dispatch(events.actions.setEvents(data.response))
    } catch (error) {
      console.error(error);
    } finally {
      console.log('Ready to go')
    }
  }
}