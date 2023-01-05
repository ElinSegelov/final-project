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
import { FormWrapper, Form } from 'styles/Forms';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import events from 'reducers/events';

const EditEvent = ({
  setEventTime,
  setEventName,
  setVenue,
  setOpenSpots,
  setTotalSpots,
  setDescription,
  handleDateSelection,
  onFormSubmit,
  eventDate,
  venue
}) => {
  const selectedEventForEdit = useSelector((store) => store.events.selectedEventForEdit)
  return (
    <div>
      <FormWrapper>
        <h2>Edit Event</h2>
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
              placeholder={selectedEventForEdit.openSpots}
              type="number"
              id="openSpots"
              onChange={(event) => setOpenSpots(event.target.value)}
              name="openSpots"
              min="1"
              max="100" />
          </label>
          <label htmlFor="totalSpots">
            <input
              placeholder={selectedEventForEdit.totalSpots}
              type="number"
              id="totalSpots"
              onChange={(event) => setTotalSpots(event.target.value)}
              name="totalSpots"
              min="1"
              max="100" />
          </label>
          <label htmlFor="venue">
            <input
              placeholder={venue}
              required
              onChange={(event) => setVenue(event.target.value)}
              type="text"
              id="venue"
              name="venue" />
          </label>
          <label htmlFor="description">
            <textarea
              value={selectedEventForEdit.description}
              placeholder={selectedEventForEdit.description}
              id="description"
              onChange={(event) => setDescription(event.target.value)}
              name="description"
              rows="4" />
          </label>
          <button type="submit">EDIT EVENT</button>
        </Form>
      </FormWrapper>
    </div>
  )
}

export default EditEvent

