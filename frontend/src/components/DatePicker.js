/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import events from 'reducers/events';

import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';

const EventCalender = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  const postedEvents = useSelector((store) => store.events.postedEvents)

  const handleDateSelection = (date) => {
    setStartDate(date);
  }
  useEffect(() => {
    dispatch(events.actions.selectDate(startDate.toDateString()));
    const todaysEvents = postedEvents.filter(
      (event) => event.eventDate === startDate.toDateString()
    )
    console.log('todaysEvents', todaysEvents)
  }, [dispatch, startDate])

  return (
    <DatePicker
      selected={startDate}
      onSelect={handleDateSelection}
      inline />
  );
};

export default EventCalender;
