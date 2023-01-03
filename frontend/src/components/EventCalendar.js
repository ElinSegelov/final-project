/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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

  const daysWithEvents = postedEvents.map((activeEvent) => parseISO(activeEvent.eventDate))
  // console.log('dagar med events', daysWithEvents)
  useEffect(() => {
    dispatch(loadEvents(accessToken));
    console.log('posted events', postedEvents)
  }, [])

  const handleDateSelection = (date) => {
    setStartDate(date);
  }
  useEffect(() => {
    const todaysEvents = postedEvents.filter(
      // inga events kommer ha samma startdate med isoString eftersom tiden kommer med
      (event) => event.eventDate === startDate.toISOString()
    )
    dispatch(events.actions.selectDate(startDate.toISOString()));
    // setEventsOfTheDay kör före setEvents efter att jag la till toISOString.
    dispatch(events.actions.setEventsOfTheDay(todaysEvents));

    console.log('todaysEvents', todaysEvents)
  }, [dispatch, startDate])

  return (
    <>
      <DatePicker
        selected={startDate}
        onSelect={handleDateSelection}
        /* highlightDates={[daysWithEvents]} */
        /* includeDates={[daysWithEvents]} */
        inline />
    </>
  );
};

export default EventCalendar;
