/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import BGGData from 'components/userDashboard/events/BGAData';
import locations from 'utils/locations.js';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import { FilledButton, GoBackFromCreateOrEditButton } from 'styles/Button.styles';
import { FormWrapper, Form, Select, TextArea, SpotsInformation, Input, ScreenReaderLabel } from 'styles/Forms';
import { FaArrowLeft } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const EditEvent = ({
  editEvent,
  onFormSubmit,
  tempEventInfoForEdit,
  setTempEventInfoForEdit,
  setEditEvent,
  setCounty
}) => {
  const selectedEventForEdit = useSelector((store) => store.events.selectedEventForEdit);
  const [startDate, setStartDate] = useState(parseISO(selectedEventForEdit.eventDate));

  const handleTempDateSelection = (date) => {
    setStartDate(date);
    setTempEventInfoForEdit({ ...tempEventInfoForEdit, eventDate: date.toISOString() });
  };

  const countyOptions = locations.map((county) => {
    return <option key={county} value={county}>{county}</option>
  });
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
        <ScreenReaderLabel htmlFor="email">E-mail</ScreenReaderLabel>
        <Input
          value={tempEventInfoForEdit.eventTime || ''}
          type="time"
          required
          onChange={(event) => {
            setTempEventInfoForEdit({ ...tempEventInfoForEdit, eventTime: event.target.value })
          }}
          id="eventTime" />

        <SpotsInformation>
          <p>Players missing</p>
          <legend>
            <ScreenReaderLabel htmlFor="openSpots">Number of players missing</ScreenReaderLabel>
            <Input
              placeholder="Missing"
              value={tempEventInfoForEdit.openSpots || ''}
              type="number"
              id="openSpots"
              onChange={(event) => {
                setTempEventInfoForEdit({ ...tempEventInfoForEdit, openSpots: event.target.value })
              }}
              min="0"
              max={tempEventInfoForEdit.totalSpots} />

            <p>of</p>
            <ScreenReaderLabel htmlFor="totalSpots">Number of players when party is full</ScreenReaderLabel>
            <Input
              placeholder="Total"
              value={tempEventInfoForEdit.totalSpots || ''}
              type="number"
              id="totalSpots"
              onChange={(event) => {
                setTempEventInfoForEdit({ ...tempEventInfoForEdit, totalSpots: event.target.value })
              }}
              min="1"
              max="8" />
          </legend>
        </SpotsInformation>
        <ScreenReaderLabel htmlFor="countySelect">Select county</ScreenReaderLabel>
        <Select id="countySelect" onChange={(event) => setCounty(event.target.value)}>
          <option value={null}>Select county</option>
          {countyOptions}
          <option value="Other">Rest of world</option>
        </Select>
        <ScreenReaderLabel htmlFor="venue">In what town/municipality is the event?</ScreenReaderLabel>
        <Input
          placeholder="Where will you play?"
          value={tempEventInfoForEdit.venue || ''}
          required
          onChange={(event) => {
            setTempEventInfoForEdit({ ...tempEventInfoForEdit, venue: event.target.value })
          }}
          type="text"
          id="venue" />
        <ScreenReaderLabel htmlFor="description">Describe the event (optional)</ScreenReaderLabel>
        <TextArea
          placeholder="Describe the event"
          value={tempEventInfoForEdit.description || ''}
          id="description"
          onChange={(event) => {
            setTempEventInfoForEdit({ ...tempEventInfoForEdit, description: event.target.value })
          }}
          maxLength={300}
          rows="4" />
        <SubmitEditButton type="submit">Edit event</SubmitEditButton>
      </Form>
    </FormWrapper>
  );
};

export default EditEvent;

const SubmitEditButton = styled(FilledButton)`
  margin: 0;
`