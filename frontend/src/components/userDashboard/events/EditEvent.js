/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import BGGData from 'components/userDashboard/events/BGGData'

import { FormWrapper, Form } from 'styles/Forms';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button1 } from 'styles/Button.styles';

import { parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import events from 'reducers/events';

const EditEvent = ({
  onFormSubmit,
  eventDate,
  tempEventInfoForEdit,
  setTempEventInfoForEdit,
  handleTempDateSelection
}) => {
  console.log('edit', tempEventInfoForEdit)
  //! This is not working.
  // const selectedEventForEdit = useSelector((store) => store.events.selectedEventForEdit)
  // const tempEventDate = tempEventInfoForEdit.eventDate
  return (
    <div>
      <FormWrapper>
        <h2>Edit Event</h2>
        {/* <BGGData tempEventInfoForEdit={tempEventInfoForEdit} /> */}
        <Form onSubmit={onFormSubmit}>
          <DatePicker
            //! The selected date right now is the same as the current date.
            //! I tried everysingle possibility. it doesnt work
            selected={eventDate}
            // selected={parseISO(selectedEventForEdit.eventDate)}
            dateFormat="yyyy/MM/dd"
            onSelect={handleTempDateSelection} />
          <p>Pick a date</p>
          <label htmlFor="eventTime">
            Choose a new time
            <input
              value={tempEventInfoForEdit.eventTime || ''}
              type="time"
              required
              onChange={(event) => {
                setTempEventInfoForEdit({ ...tempEventInfoForEdit, eventTime: event.target.value })
              }}
              id="eventTime"
              name="eventTime" />
          </label>
          <label htmlFor="openSpots">
            <input
              value={tempEventInfoForEdit.openSpots || ''}
              type="number"
              id="openSpots"
              onChange={(event) => {
                setTempEventInfoForEdit({ ...tempEventInfoForEdit, openSpots: event.target.value })
              }}
              name="openSpots"
              min="1"
              max="100" />
          </label>
          <label htmlFor="totalSpots">
            <input
              value={tempEventInfoForEdit.totalSpots || ''}
              type="number"
              id="totalSpots"
              onChange={(event) => {
                setTempEventInfoForEdit({ ...tempEventInfoForEdit, totalSpots: event.target.value })
              }}
              name="totalSpots"
              min="1"
              max="100" />
          </label>
          <label htmlFor="venue">
            <input
              value={tempEventInfoForEdit.venue || ''}
              required
              onChange={(event) => {
                setTempEventInfoForEdit({ ...tempEventInfoForEdit, venue: event.target.value })
              }}
              type="text"
              id="venue"
              name="venue" />
          </label>
          <label htmlFor="description">
            <textarea
              value={tempEventInfoForEdit.description || ''}
              id="description"
              onChange={(event) => {
                setTempEventInfoForEdit({ ...tempEventInfoForEdit, description: event.target.value })
              }}
              name="description"
              rows="4" />
          </label>
          <Button1 type="submit">EDIT EVENT</Button1>
        </Form>
      </FormWrapper>
    </div>
  )
}

export default EditEvent

