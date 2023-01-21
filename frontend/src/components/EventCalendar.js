/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import events, { loadEvents } from 'reducers/events';
import 'react-datepicker/dist/react-datepicker.css';
import { batch, useDispatch, useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import styled from 'styled-components/macro';

const EventCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [daysWithEvents, setDaysWithEvents] = useState([]);
  const dispatch = useDispatch();
  const postedEvents = useSelector((store) => store.events.postedEvents);
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const countyFilter = useSelector((store) => store.events.countyFilter);

  useEffect(() => {
    dispatch(loadEvents(accessToken));
  }, []);

  const handleDateSelection = (selectedDate) => {
    setStartDate(selectedDate);
  };
  useEffect(() => {
    batch(() => {
      dispatch(events.actions.setSelectDate(startDate.toISOString()));
    });
  }, [dispatch, startDate]);

  useEffect(() => {
    if (postedEvents) {
      // Filtering posted events' dates with date for selected day (startDate).
      // These are dispatched to the store as eventsOfTheDay.
      const selectedDayEvents = postedEvents.filter(
        (event) => event.eventDate.slice(0, 10) === startDate.toISOString().slice(0, 10)
      );
      dispatch(events.actions.setEventsOfTheDay(selectedDayEvents));
      // For the datepicker to show whether the selected day has posted events,
      // the dates stored in the reducer needs to be paresed back to ISO
      if (countyFilter === 'All') {
        const postedEventsWithISODate = postedEvents.map(
          (activeEvent) => parseISO(activeEvent.eventDate)
        );
        setDaysWithEvents(postedEventsWithISODate);
      } else {
        // Filtering events based on selected county.
        // Updateing daysWithEvents so datepicker highlight days with events in the selected county.
        const filteredEventsBasedOnCounty = postedEvents.filter(
          (event) => event.county === countyFilter
        );
        const filteredEventsBasedOnCountyWithISODate = filteredEventsBasedOnCounty.map(
          (activeEvent) => parseISO(activeEvent.eventDate)
        );
        setDaysWithEvents(filteredEventsBasedOnCountyWithISODate);
      }
    }
  }, [postedEvents, startDate, countyFilter]);

  return (
    <EventCalendarWrapper>
      <DatePicker
        selected={startDate}
        onSelect={handleDateSelection}
        highlightDates={daysWithEvents}
        dateFormat="yyyy/MM/dd"
        calendarStartDay={1}
        inline />
    </EventCalendarWrapper>
  );
};

export default EventCalendar;

const EventCalendarWrapper = styled.div`
  width: 100%;
  
  @media(min-width: 768px) {
    width: 30rem;
  }
  
  @media(min-width: 1024px) {
    width: 100%;
  }
  
  @media(min-width: 1400px) {
    width: 30rem;
  }
`