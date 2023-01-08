/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react'
import BGGData from 'components/userDashboard/events/BGGData'
import styled from 'styled-components/macro';
import { FormWrapper, Form } from 'styles/Forms';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button1 } from 'styles/Button.styles';
import { parseISO } from 'date-fns';
import { useSelector } from 'react-redux';

const EditEvent = ({
  editEvent,
  onFormSubmit,
  tempEventInfoForEdit,
  setTempEventInfoForEdit
}) => {
  const selectedEventForEdit = useSelector((store) => store.events.selectedEventForEdit)
  const [startDate, setStartDate] = useState(parseISO(selectedEventForEdit.eventDate));

  const handleTempDateSelection = (date) => {
    setStartDate(date)
    setTempEventInfoForEdit({ ...tempEventInfoForEdit, eventDate: date.toISOString() })
  }
  return (
    <div>
      <FormWrapper>
        <h2>Edit Event</h2>
        <BGGData
          tempEventInfoForEdit={tempEventInfoForEdit}
          editEvent={editEvent}
          setTempEventInfoForEdit={setTempEventInfoForEdit} />
        <Form onSubmit={onFormSubmit}>
          <DatePicker
            selected={startDate}
            dateFormat="yyyy/MM/dd"
            onSelect={handleTempDateSelection} />
          <p>Pick a date</p>
          <label htmlFor="eventTime">
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
          <SpotsInformation>
            <p>Open spots</p>
            <legend>
              <label htmlFor="openSpots">
                <input
                  placeholder="Open"
                  value={tempEventInfoForEdit.openSpots || ''}
                  type="number"
                  id="openSpots"
                  onChange={(event) => {
                    setTempEventInfoForEdit({ ...tempEventInfoForEdit, openSpots: event.target.value })
                  }}
                  name="openSpots"
                  min="0"
                  max={tempEventInfoForEdit.totalSpots} />
              </label>
              <p>of</p>
              <label htmlFor="totalSpots">
                <input
                  placeholder="Total"
                  value={tempEventInfoForEdit.totalSpots || ''}
                  type="number"
                  id="totalSpots"
                  onChange={(event) => {
                    setTempEventInfoForEdit({ ...tempEventInfoForEdit, totalSpots: event.target.value })
                  }}
                  name="totalSpots"
                  min="1"
                  max="8" />
              </label>
            </legend>
          </SpotsInformation>
          <label htmlFor="venue">
            <input
              placeholder="Where will you play?"
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
              placeholder="Describe the event"
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

const SpotsInformation = styled.div`
legend {
  display: flex;
  gap: 0.5rem;
}
`

