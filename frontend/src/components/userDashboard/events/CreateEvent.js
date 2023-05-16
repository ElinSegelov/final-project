
import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import BGAData from 'components/userDashboard/events/BGAData';
import locations from 'utils/locations.js';
import events from 'reducers/events';
import DatePicker from 'react-datepicker';
import user from 'reducers/user';
import { FormWrapper, Form, Input, Select, SpotsInformation, TextArea, ScreenReaderLabel } from 'styles/Forms';
import { FilledButton, GoBackFromCreateOrEditButton } from 'styles/Button.styles';
import { FaArrowLeft } from 'react-icons/fa';
import { swalInformation } from 'utils/sweetAlerts';
import { methodHeadersBody } from 'utils/requestOptions';
import { API_URL } from 'utils/urls';
import 'react-datepicker/dist/react-datepicker.css';

const CreateEvent = ({ setCreateEvent }) => {
  const [tempEventInfoForEdit, setTempEventInfoForEdit] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const userInfo = useSelector((store) => store.user.userInfo);
  const dispatch = useDispatch();

  const handleDateSelection = (date) => {
    const ISODate = date.toISOString();
    setStartDate(date);
    setTempEventInfoForEdit({ ...tempEventInfoForEdit, eventDate: ISODate })
  };
  const handleEventValidation = (success) => {
    if (success) {
      swalInformation('Your event has been created!', '', 'success', 2000)
      setCreateEvent(false)
    } else {
      swalInformation('Something went wrong', 'Try again later', 'error', 2500)
    }
  }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const options = methodHeadersBody('POST', userInfo, tempEventInfoForEdit);

    if (tempEventInfoForEdit.eventDate) {
      try {
        const response = await fetch(API_URL('event'), options);
        const data = await response.json();

        if (data.success) {
          batch(() => {
            dispatch(user.actions.changeToHostingEvents(data.response.hostingEvents));
            dispatch(events.actions.setError(null));
            handleEventValidation(data.success);
          })
        } else {
          batch(() => {
            dispatch(events.actions.setError(data.response));
            handleEventValidation(data.success);
          })
        }
      } catch (err) {
        console.error(err.stack);
      }
    } else {
      swalInformation('Oops!', 'Please click on selected date', 'error', 2500)
    }
  }
  // For rendering options based on info in locations.js
  const countyOptions = locations.map((county) => {
    return <option key={county} value={county}>{county}</option>
  });

  return (
    <FormWrapper>
      <GoBackFromCreateOrEditButton type="button" onClick={() => setCreateEvent(false)}><FaArrowLeft /></GoBackFromCreateOrEditButton>
      <h2>Create event</h2>
      <BGAData setTempEventInfoForEdit={setTempEventInfoForEdit} />
      <Form onSubmit={onFormSubmit}>
        <DatePicker
          selected={startDate}
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
