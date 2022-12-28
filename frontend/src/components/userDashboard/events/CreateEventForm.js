/* eslint-disable no-undef */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import BGGData from 'components/userDashboard/events/BGGData'

import { API_URL } from 'utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FormWrapper, Form, Input } from 'styles/Forms';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

const CreateEventForm = () => {
  const [eventDate, setEventDate] = useState(new Date())
  const [eventTime, setEventTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [venue, setVenue] = useState('');
  const [game, setGame] = useState('');
  const [openSpots, setOpenSpots] = useState('');
  const [totalSpots, setTotalSpots] = useState('');
  const [description, setDescription] = useState('');

  const user = useSelector((store) => store.user.userInfo);
  const selectedGame = useSelector((store) => store.events.selectedGameWithDataFromAPI);
  let gameName;
  const handleDateSelection = (date) => {
    // const navigate = useNavigate();
    setEventDate(date)
    console.log(eventDate)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    if (selectedGame.name.length > 1) {
      const nameOfGame = selectedGame.name.find((nameGame) => nameGame.primary === 'true')
      console.log('first', nameOfGame.text)
      gameName = nameOfGame.text;
    } else {
      console.log('secon', selectedGame.name.text)
      gameName = selectedGame.name.text;
    }
    /* const nameOfGame = info.name.find((nameGame) => nameGame.primary === 'true')
          console.log('info.name', nameOfGame.text) */
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.accessToken
      },
      body: JSON.stringify({
        host: user._id,
        eventDate,
        eventTime,
        eventName,
        venue,
        game: gameName,
        openSpots,
        totalSpots,
        description
      })
    }
    fetch(API_URL('event'), options)
    console.log('eventDate', eventDate)
    console.log('eventTime', eventTime)
  }
  // Se över hur vi handterar datum/tid i frontend och backend
  return (
    <div>
      <FormWrapper>
        <h2>Create Event</h2>
        <BGGData />
        <Form onSubmit={onFormSubmit}>
          <DatePicker
            selected={eventDate}
            onSelect={handleDateSelection} />
          <p>Pick a date</p>
          <label htmlFor="eventTime">
            <input
              type="time"
              required
              onChange={(event) => setEventTime(event.target.value)}
              id="eventTime"
              name="eventTime" />
          </label>
          <label htmlFor="openSpots">
            <input
              placeholder="How many players are missing?"
              type="number"
              id="openSpots"
              name="openSpots"
              min="1"
              max="100" />
          </label>
          <label htmlFor="totalSpots">
            <input
              placeholder="Total Spots"
              type="number"
              id="totalSpots"
              name="totalSpots"
              min="1"
              max="100" />
          </label>
          <label htmlFor="venue">
            <input
              placeholder="Where will you play?"
              required
              type="text"
              id="venue"
              name="venue" />
          </label>
          <label htmlFor="description">
            <textarea
              placeholder="Describe the event"
              id="description"
              name="description"
              rows="4" />
          </label>
          <button type="submit">CREATE EVENT</button>
        </Form>
      </FormWrapper>
    </div>
  )
}

export default CreateEventForm

