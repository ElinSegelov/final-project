/* eslint-disable operator-linebreak */
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
  const dispatch = useDispatch();
  const postedEvents = useSelector((store) => store.events.postedEvents)
  const accessToken = useSelector((store) => store.user.userInfo.accessToken)

  useEffect(() => {
    dispatch(loadEvents(accessToken));
  }, [])

  const handleDateSelection = (selectedDate) => {
    setStartDate(selectedDate);
  }
  useEffect(() => {
    batch(() => {
      dispatch(events.actions.setSelectDate(startDate.toISOString()));
    })
  }, [dispatch, startDate])

  useEffect(() => {
    if (postedEvents) {
      const todaysEvents = postedEvents.filter(
        (event) => event.eventDate.slice(0, 10) === startDate.toISOString().slice(0, 10)
      )
      dispatch(events.actions.setEventsOfTheDay(todaysEvents));
    }
  }, [postedEvents, startDate])

  const daysWithEvents = postedEvents.map((activeEvent) => parseISO(activeEvent.eventDate))

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
  margin-bottom: 1rem;
`