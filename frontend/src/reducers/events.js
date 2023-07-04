/* eslint-disable quote-props */
import { createSlice } from '@reduxjs/toolkit';
import { swalInformation } from 'utils/sweetAlerts';
import { API_URL } from 'utils/urls';

const events = createSlice({
  name: 'events',
  initialState: {
    postedEvents: [],
    eventsOfTheDay: [],
    selectedGameWithDataFromAPI: null,
    tempEventInfoForEdit: [],
    selectedEventForEdit: [],
    selectedDate: (new Date().toISOString()),
    hostingEvents: [],
    locations: [],
    countyFilter: 'All',
    error: null
  },
  reducers: {
    setSelectDate: (store, action) => {
      store.selectedDate = action.payload
    },
    setPostedEvents: (store, action) => {
      store.postedEvents = action.payload
    },
    setTempEventInfoForEdit: (store, action) => {
      store.tempEventInfoForEdit = action.payload
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
    setLocations: (store, action) => {
      store.locations = action.payload
    },
    setCountyFilter: (store, action) => {
      store.countyFilter = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload;
    }
  }
});

export default events;

export const loadEvents = (accessToken) => {
  return async (dispatch) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    };
    try {
      const response = await fetch(API_URL('event'), options);
      const data = await response.json();
      if (data.success) {
        dispatch(events.actions.setPostedEvents(data.response));
      }
    } catch (error) {
      console.error(error.stack);
      dispatch(events.actions.setError(error.message));
      swalInformation('Could not load any events.', 'Try again later', 'error', 3000);
    }
  };
};