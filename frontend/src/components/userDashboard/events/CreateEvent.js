import React from 'react';
import BGAData from 'components/userDashboard/events/BGAData';
import styled from 'styled-components/macro';
import DatePicker from 'react-datepicker';
import locations from 'utils/locations.js';
import { FormWrapper, Form, Input, Select, SpotsInformation, TextArea, ScreenReaderLabel } from 'styles/Forms';
import { FilledButton, GoBackFromCreateOrEditButton } from 'styles/Button.styles';
import { FaArrowLeft } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const CreateEvent = ({
  setTempEventInfoForEdit,
  tempEventInfoForEdit,
  handleDateSelection,
  onFormSubmit,
  eventDate,
  setHandleEvent
}) => {
  const countyOptions = locations.map((county) => {
    return <option key={county} value={county}>{county}</option>
  });

  return (
    <FormWrapper>
      <GoBackFromCreateOrEditButton type="button" onClick={() => setHandleEvent(false)}><FaArrowLeft /></GoBackFromCreateOrEditButton>
      <h2>Create event</h2>
      <BGAData setTempEventInfoForEdit={setTempEventInfoForEdit} />
      <Form onSubmit={onFormSubmit}>
        <DatePicker
          selected={eventDate}
          dateFormat="yyyy/MM/dd"
          calendarStartDay={1}
          onSelect={handleDateSelection} />
        <ScreenReaderLabel htmlFor="eventTime">Event time</ScreenReaderLabel>
        <Input
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
              required
              type="number"
              placeholder="Missing"
              id="openSpots"
              onChange={(event) => {
                setTempEventInfoForEdit({ ...tempEventInfoForEdit, openSpots: event.target.value })
              }}
              min="1"
              max="8" />

            <p>of</p>
            <ScreenReaderLabel htmlFor="totalSpots">Number of players when party is full</ScreenReaderLabel>
            <Input
              required
              placeholder="Total"
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
        <Select
          id="countySelect"
          onChange={(event) => {
            setTempEventInfoForEdit({ ...tempEventInfoForEdit, county: event.target.value })
          }}>
          <option value={null}>Select county</option>
          {countyOptions}
          <option value="Other">Rest of world</option>
        </Select>
        <ScreenReaderLabel htmlFor="venue">In what town/municipality is the event?</ScreenReaderLabel>
        <Input
          placeholder="City/Town/Municipality"
          required
          onChange={(event) => {
            setTempEventInfoForEdit({ ...tempEventInfoForEdit, venue: event.target.value })
          }}
          type="text"
          id="venue" />

        <ScreenReaderLabel htmlFor="description">Describe the event (optional)</ScreenReaderLabel>
        <TextArea
          placeholder="Describe the event"
          maxLength={300}
          id="description"
          onChange={(event) => {
            setTempEventInfoForEdit({ ...tempEventInfoForEdit, description: event.target.value })
          }}
          rows="4" />

        <CreateButton type="submit">Create event</CreateButton>
      </Form>
    </FormWrapper>
  );
};

export default CreateEvent;

const CreateButton = styled(FilledButton)`
  margin: 0;
`
