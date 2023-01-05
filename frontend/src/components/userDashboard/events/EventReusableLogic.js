/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-undef */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import BGGData from 'components/userDashboard/events/BGGData'

import { API_URL } from 'utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FormWrapper, Form, Input } from 'styles/Forms';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { Button1 } from 'styles/Button.styles';
import EditEvent from './EditEvent';
import CreateEvent from './CreateEvent';

const EventReusableLogic = ({ setHandleEvent, editEvent }) => {
  const [eventDate, setEventDate] = useState(new Date())
  const [eventTime, setEventTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [venue, setVenue] = useState('');
  const [openSpots, setOpenSpots] = useState('');
  const [totalSpots, setTotalSpots] = useState('');
  const [description, setDescription] = useState('');

  const user = useSelector((store) => store.user.userInfo);
  const selectedGame = useSelector((store) => store.events.selectedGameWithDataFromAPI);
  // const selectedEventForEdit = useSelector((store) => store.events.selectedEventForEdit)
  let gameName;

  /* //! Tanke på vad vi skulle vilja göra:
  if (venue || openSpots || !== '') {
    är värdet på venue != '', add value to header
  } */

  const handleDateSelection = (date) => {
    setEventDate(date)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    // The games sometimes have several titles. We check if there are more than one title, if so,
    // we find the primary one.
    if (selectedGame.name.length > 1) {
      const nameOfGame = selectedGame.name.find((nameGame) => nameGame.primary === 'true')
      gameName = nameOfGame.text;
    } else {
      gameName = selectedGame.name.text;
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.accessToken
      },
      body: JSON.stringify({
        hostId: user.userId,
        host: user.username,
        eventDate: eventDate.toISOString(),
        eventTime,
        eventName, // Saknas input
        venue,
        game: gameName,
        openSpots,
        totalSpots,
        description
      })
    }
    fetch(API_URL('event'), options)
    setHandleEvent(false)
  }
  return (
    <section>
      {editEvent
        ? <EditEvent
          eventDate={eventDate}
          setEventTime={setEventTime}
          setEventName={setEventName}
          setVenue={setVenue}
          venue={venue}
          setOpenSpots={setOpenSpots}
          setTotalSpots={setTotalSpots}
          setDescription={setDescription}
          handleDateSelection={handleDateSelection}
          onFormSubmit={onFormSubmit} />
        : <CreateEvent
          eventDate={eventDate}
          setEventTime={setEventTime}
          setEventName={setEventName}
          setVenue={setVenue}
          setOpenSpots={setOpenSpots}
          setTotalSpots={setTotalSpots}
          setDescription={setDescription}
          handleDateSelection={handleDateSelection}
          onFormSubmit={onFormSubmit} />}
    </section>
  )
}

export default EventReusableLogic
