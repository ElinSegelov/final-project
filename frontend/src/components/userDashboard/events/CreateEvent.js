/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import BGGData from 'components/userDashboard/events/BGGData';
import styled from 'styled-components/macro';
import { FormWrapper, Form, Input, Select } from 'styles/Forms';
import DatePicker from 'react-datepicker';
import { Button1 } from 'styles/Button.styles';
import 'react-datepicker/dist/react-datepicker.css';
import countys from 'utils/countys';

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
  totalSpots
}) => {
  const countyOptions = countys.map((county) => {
    return <option key={county} value={county}>{county}</option>
  })

  return (
    <FormWrapper>
      <h2>Create Event</h2>
      <BGGData />
      <Form onSubmit={onFormSubmit}>
        <DatePicker
          selected={eventDate}
          dateFormat="yyyy/MM/dd"
          onSelect={handleDateSelection} />
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
                max={totalSpots} />
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
            required
            onChange={(event) => setVenue(event.target.value)}
            type="text"
            id="venue"
            name="venue" />
        </label>
        <label htmlFor="description">
          <TextArea
            placeholder="Describe the event"
            maxLength={300}
            id="description"
            onChange={(event) => setDescription(event.target.value)}
            name="description"
            rows="4" />
        </label>
        <Button1 type="submit">Create Event</Button1>
      </Form>
    </FormWrapper>
  )
}

export default CreateEvent

const SpotsInformation = styled.div`
  text-align: center;
  legend {
    width: 12rem;
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
    justify-content: space-between;
  }

  input {
    width: 5rem;
    margin-top: 0.5rem;
  }
`
const TextArea = styled.textarea`
  width: 12rem;
`