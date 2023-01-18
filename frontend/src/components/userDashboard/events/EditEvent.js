/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import BGGData from 'components/userDashboard/events/BGGData';
import { useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import { FilledButton, GoBackFromCreateOrEditButton } from 'styles/Button.styles';
import { FormWrapper, Form, Select, TextArea, SpotsInformation, Input } from 'styles/Forms';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowLeft } from 'react-icons/fa'
import countys from 'utils/countys';
import styled from 'styled-components/macro';

const EditEvent = ({
  editEvent,
  onFormSubmit,
  tempEventInfoForEdit,
  setTempEventInfoForEdit,
  setEditEvent,
  setCounty
}) => {
  const selectedEventForEdit = useSelector((store) => store.events.selectedEventForEdit)
  const [startDate, setStartDate] = useState(parseISO(selectedEventForEdit.eventDate));

  const handleTempDateSelection = (date) => {
    setStartDate(date)
    setTempEventInfoForEdit({ ...tempEventInfoForEdit, eventDate: date.toISOString() })
  }

  const countyOptions = countys.map((county) => {
    return <option key={county} value={county}>{county}</option>
  })
  return (
    <FormWrapper>
      <GoBackFromCreateOrEditButton type="button" onClick={() => setEditEvent(false)}><FaArrowLeft /></GoBackFromCreateOrEditButton>
      <h2>Edit event</h2>
      <BGGData
        tempEventInfoForEdit={tempEventInfoForEdit}
        editEvent={editEvent}
        setTempEventInfoForEdit={setTempEventInfoForEdit} />
      <Form onSubmit={onFormSubmit}>
        <DatePicker
          selected={startDate}
          dateFormat="yyyy/MM/dd"
          calendarStartDay={1}
          onSelect={handleTempDateSelection} />
        <label htmlFor="eventTime">
          <Input
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
          <p>Players missing</p>
          <legend>
            <label htmlFor="openSpots">
              <Input
                placeholder="Missing"
                value={tempEventInfoForEdit.openSpots || ''}
                type="number"
                id="openSpots"
                onChange={(event) => {
                  setTempEventInfoForEdit({
                    ...tempEventInfoForEdit, openSpots: event.target.value
                  })
                }}
                name="openSpots"
                min="0"
                max={tempEventInfoForEdit.totalSpots} />
            </label>
            <p>of</p>
            <label htmlFor="totalSpots">
              <Input
                placeholder="Total"
                value={tempEventInfoForEdit.totalSpots || ''}
                type="number"
                id="totalSpots"
                onChange={(event) => {
                  setTempEventInfoForEdit({
                    ...tempEventInfoForEdit, totalSpots: event.target.value
                  })
                }}
                name="totalSpots"
                min="1"
                max="8" />
            </label>
          </legend>
        </SpotsInformation>
        <Select onChange={(event) => setCounty(event.target.value)}>
          <option value={null}>Select county</option>
          {countyOptions}
          <option value="Other">Rest of world</option>
        </Select>
        <label htmlFor="venue">
          <Input
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
          <TextArea
            placeholder="Describe the event"
            value={tempEventInfoForEdit.description || ''}
            id="description"
            onChange={(event) => {
              setTempEventInfoForEdit({ ...tempEventInfoForEdit, description: event.target.value })
            }}
            maxLength={300}
            name="description"
            rows="4" />
        </label>
        <SubmitEditButton type="submit">Edit event</SubmitEditButton>
      </Form>
    </FormWrapper>
  )
}

export default EditEvent;

const SubmitEditButton = styled(FilledButton)`
  margin: 0
`