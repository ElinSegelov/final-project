/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import events, { loadEvents } from 'reducers/events';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO } from 'date-fns';

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
    const todaysEvents = postedEvents.filter(
      (event) => event.eventDate.slice(0, 10) === startDate.toISOString().slice(0, 10)
    )
    dispatch(events.actions.selectDate(startDate.toISOString()));
    dispatch(events.actions.setEventsOfTheDay(todaysEvents));
  }, [dispatch, startDate])

  const daysWithEvents = postedEvents.map((activeEvent) => parseISO(activeEvent.eventDate))

  return (
    <DatePicker
      selected={startDate}
      onSelect={handleDateSelection}
      highlightDates={daysWithEvents}
      dateFormat="yyyy/MM/dd"
      inline />
  );
};

export default EventCalendar;
