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

const CreateEventForm = ({ setHandleEvent, editEvent }) => {
  const [eventDate, setEventDate] = useState(new Date())
  const [eventTime, setEventTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [venue, setVenue] = useState('');
  const [openSpots, setOpenSpots] = useState('');
  const [totalSpots, setTotalSpots] = useState('');
  const [description, setDescription] = useState('');

  const user = useSelector((store) => store.user.userInfo);
  const selectedGame = useSelector((store) => store.events.selectedGameWithDataFromAPI);
  let gameName;

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
    // let temp;
    const edit = () => {
      if (editEvent) {
        return 'PATCH'
      } else {
        return 'POST'
      }
    }
    const options = {
      method: edit,
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
    <div>
      <FormWrapper>
        <h2>Create Event</h2>
        <BGGData />
        <Form onSubmit={onFormSubmit}>
          <DatePicker
            selected={eventDate}
            dateFormat="yyyy/MM/dd"
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
          <SpotsInformation>
            <p>Open spots</p>
            <legend>
              <label htmlFor="openSpots">
                <input
                  type="number"
                  placeholder="Open"
                  id="openSpots"
                  onChange={(event) => setOpenSpots(event.target.value)}
                  name="openSpots"
                  min="1"
                  max="100" />
              </label>
              <p>of</p>
              <label htmlFor="totalSpots">
                <input
                  placeholder="Total"
                  type="number"
                  id="totalSpots"
                  onChange={(event) => setTotalSpots(event.target.value)}
                  name="totalSpots"
                  min="1"
                  max="100" />
              </label>
            </legend>
          </SpotsInformation>
          <label htmlFor="venue">
            <Input
              placeholder="Where will you play?"
              required
              onChange={(event) => setVenue(event.target.value)}
              type="text"
              id="venue"
              name="venue" />
          </label>
          <label htmlFor="description">
            <textarea
              placeholder="Describe the event"
              id="description"
              onChange={(event) => setDescription(event.target.value)}
              name="description"
              rows="4" />
          </label>
          <Button1 type="submit">CREATE EVENT</Button1>
        </Form>
      </FormWrapper>
    </div>
  )
}

export default CreateEventForm

const SpotsInformation = styled.div`


legend {
  display: flex;
  gap: 0.5rem;
}

input {
  width: 2.7rem;
}
`