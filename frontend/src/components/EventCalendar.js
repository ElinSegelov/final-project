/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import events, { loadEvents } from 'reducers/events';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';

const EventCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  const postedEvents = useSelector((store) => store.events.postedEvents)
  const accessToken = useSelector((store) => store.user.userInfo.accessToken)

  useEffect(() => {
    dispatch(loadEvents(accessToken));
  }, [])

  const handleDateSelection = (date) => {
    setStartDate(date);
  }
  useEffect(() => {
    const todaysEvents = postedEvents.filter(
      (event) => event.eventDate === startDate.toDateString()
    )
    dispatch(events.actions.selectDate(startDate.toDateString()));
    dispatch(events.actions.setEventsOfTheDay(todaysEvents));

    console.log('todaysEvents', todaysEvents)
  }, [dispatch, startDate])

  return (
    <DatePicker
      selected={startDate}
      onSelect={handleDateSelection}
      inline />
  );
};

export default EventCalendar;
