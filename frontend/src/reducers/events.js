/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable quote-props */
import { createSlice } from '@reduxjs/toolkit';
import ui from './ui';

const events = createSlice({
  name: 'events',
  initialState: {
    postedEvents: [],
    eventsOfTheDay: [],
    selectedGameWithDataFromAPI: {},
    selectedEventForEdit: [],
    selectedDate: (new Date().toISOString()),
    hostingEvents: [],
    error: null
  },
  reducers: {
    selectDate: (store, action) => {
      store.selectedDate = action.payload
    },
    setEvents: (store, action) => {
      store.postedEvents = action.payload
    },
    setSelectedEventForEdit: (store, action) => {
      store.selectedEventForEdit = action.payload
    },
    setEventsOfTheDay: (store, action) => {
      store.eventsOfTheDay = action.payload
    },
    setSelectedGameWithDataFromAPI: (store, action) => {
      store.selectedGameWithDataFromAPI = action.payload
    },
    setHostingEvents: (store, action) => {
      store.hostingEvents = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload;
    }
  }
});

export default events;

export const loadEvents = (accessToken) => {
  return async (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    //! UPPDATERA TILL API SEN
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
      dispatch(ui.actions.setLoading(false))
      console.log('ready')
    }
  }
}