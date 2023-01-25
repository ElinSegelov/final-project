/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import BGGData from 'components/userDashboard/events/BGAData';
import styled from 'styled-components/macro';
import DatePicker from 'react-datepicker';
import countys from 'utils/countys';
import { FormWrapper, Form, Input, Select, SpotsInformation, TextArea, ScreenReaderLabel } from 'styles/Forms';
import { FilledButton, GoBackFromCreateOrEditButton } from 'styles/Button.styles';
import { FaArrowLeft } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

const CreateEvent = ({
  setEventTime,
  setVenue,
  setCounty,
  setOpenSpots,
  setTotalSpots,
  setDescription,
  handleDateSelection,
  onFormSubmit,
  eventDate,
  totalSpots,
  setHandleEvent
}) => {
  const countyOptions = countys.map((county) => {
    return <option key={county} value={county}>{county}</option>
  });

  return (
    <FormWrapper>
      <GoBackFromCreateOrEditButton type="button" onClick={() => setHandleEvent(false)}><FaArrowLeft /></GoBackFromCreateOrEditButton>
      <h2>Create event</h2>
      <BGGData />
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
          onChange={(event) => setEventTime(event.target.value)}
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
              onChange={(event) => setOpenSpots(event.target.value)}
              min="1"
              max={totalSpots} />

            <p>of</p>
            <ScreenReaderLabel htmlFor="totalSpots">Number of players when party is full</ScreenReaderLabel>
            <Input
              required
              placeholder="Total"
              type="number"
              id="totalSpots"
              onChange={(event) => setTotalSpots(event.target.value)}
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
          placeholder="City/Town/Municipality"
          required
          onChange={(event) => setVenue(event.target.value)}
          type="text"
          id="venue" />

        <ScreenReaderLabel htmlFor="description">Describe the event (optional)</ScreenReaderLabel>
        <TextArea
          placeholder="Describe the event"
          maxLength={300}
          id="description"
          onChange={(event) => setDescription(event.target.value)}
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
