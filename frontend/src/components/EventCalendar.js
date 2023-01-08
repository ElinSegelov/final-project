/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import events, { loadEvents } from 'reducers/events';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO } from 'date-fns';

import { LoadingForGameSearch } from 'components/loaders/loadingAnimations';

import styled from 'styled-components';

const EventCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.ui.isLoading)
  const postedEvents = useSelector((store) => store.events.postedEvents)
  const accessToken = useSelector((store) => store.user.userInfo.accessToken)

  useEffect(() => {
    dispatch(loadEvents(accessToken));
    console.log('posted events', postedEvents) //! TA BORT SEN
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

    console.log('todaysEvents', todaysEvents) //! TA BORT SEN
  }, [dispatch, startDate])

  const daysWithEvents = postedEvents.map((activeEvent) => parseISO(activeEvent.eventDate))

  return (
    <div>
      {isLoading
        ?
        <LoaderWrapper>
          <LoadingForGameSearch />
        </LoaderWrapper>
        :
        <DatePicker
          selected={startDate}
          onSelect={handleDateSelection}
          highlightDates={daysWithEvents}
          dateFormat="yyyy/MM/dd"
          inline />}
    </div>
  );
};

export default EventCalendar;

const LoaderWrapper = styled.div`
  width: 100px;
  height: 100px;
`
