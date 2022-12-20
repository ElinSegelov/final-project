/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import events from 'reducers/events';
import { format } from 'date-fns'

import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';

const EventCalender = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleDateSelection = (date) => {
    // const selectedDate = format(date, 'yyyy-MM-dd')

    setStartDate(date);
  }
  useEffect(() => {
    // console.log(format(startDate, 'dd-MM-yyy'))
    const selectedDate = startDate.toString().slice(4, 15)
    console.log('selected date i datpicker', selectedDate)
    dispatch(events.actions.setEventsOfTheDay(selectedDate));
  }, [dispatch, startDate])

  return (
    <DatePicker
      selected={startDate}
      onSelect={handleDateSelection}
      inline />
  );
};

export default EventCalender;
