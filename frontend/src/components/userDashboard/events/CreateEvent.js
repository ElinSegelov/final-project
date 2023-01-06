/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react'
import BGGData from 'components/userDashboard/events/BGGData'

import styled from 'styled-components/macro';
import { FormWrapper, Form, Input } from 'styles/Forms';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { Button1 } from 'styles/Button.styles';

const CreateEvent = ({
  setEventTime,
  setEventName, //! No value / input
  setVenue,
  setOpenSpots,
  setTotalSpots,
  setDescription,
  handleDateSelection,
  onFormSubmit,
  eventDate
}) => {
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
                  required
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
                  required
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

export default CreateEvent

const SpotsInformation = styled.div`
legend {
  display: flex;
  gap: 0.5rem;
}
`