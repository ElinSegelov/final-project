/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable quote-props */
import React, { useEffect, useState } from 'react';
import events from 'reducers/events';
import user from 'reducers/user'
import { batch, useDispatch, useSelector } from 'react-redux';
import { swalInformation } from 'utils/sweetAlerts';
import { API_URL } from 'utils/urls';
import { InnerWrapper } from 'styles/Containers';
import { methodHeadersBody } from 'utils/requestOptions';
import EditEvent from './EditEvent';
import CreateEvent from './CreateEvent';

const EventReusableLogic = ({ handleEvent, setHandleEvent, editEvent, setEditEvent }) => {
  const [eventDate, setEventDate] = useState(new Date());
  const [tempEventInfoForEdit, setTempEventInfoForEdit] = useState({});
  const [county, setCounty] = useState('');
  const userInfo = useSelector((store) => store.user.userInfo);
  const selectedGame = useSelector((store) => store.events.selectedGameWithDataFromAPI);
  const selectedEventForEdit = useSelector((store) => store.events.selectedEventForEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editEvent) {
      setTempEventInfoForEdit(selectedEventForEdit);
    }
  }, [selectedEventForEdit, editEvent]);

  const handleDateSelection = (date) => {
    setEventDate(date);
    console.log(date)
    setTempEventInfoForEdit({ ...tempEventInfoForEdit, eventDate: date.toISOString() })
  };

  const handleEventValidation = (success) => {
    if (selectedEventForEdit === tempEventInfoForEdit) {
      swalInformation('No changes were made', '', 'warning', 2000)
    } else if (editEvent && success) {
      swalInformation('Your event has been updated!', '', 'success', 2000)
      setEditEvent(false)
    } else if (handleEvent) {
      swalInformation('Your event has been created!', '', 'success', 2000)
      setHandleEvent(false)
    } else {
      swalInformation('Your event has been created!', '', 'success', 2000)
      setHandleEvent(false)
      setEditEvent(false)
    }
  }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const options = methodHeadersBody('POST', userInfo, tempEventInfoForEdit)

    if (editEvent) {
      if (selectedEventForEdit !== tempEventInfoForEdit) {
        try {
          const response = await fetch(API_URL('event'), options);
          const data = await response.json();

          if (data.success) {
            batch(() => {
              dispatch(user.actions.changeToHostingEvents(data.response.hostingEvents));
              dispatch(events.actions.setError(null));
              handleEventValidation(data.success);
            })
            dispatch(events.actions.setSelectedGameWithDataFromAPI({}))
          } else {
            batch(() => {
              dispatch(events.actions.setError(data.response));
              handleEventValidation(data.success);
            })
          }
        } catch (error) {
          console.error(error.stack)
        }
      } else {
        handleEventValidation();
      }
    } else if (handleEvent) {
      // const options = methodHeadersBody('POST', userInfo, tempEventInfoForEdit)
      console.log(tempEventInfoForEdit)
      if (!tempEventInfoForEdit.eventDate) {
        try {
          await setTempEventInfoForEdit({ ...tempEventInfoForEdit, eventDate: eventDate.toISOString() })
          console.log('färsöer lägga till datum', tempEventInfoForEdit)
        } catch {
          console.log('skit')
        }
      }
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
        window.alert('Click on selected date ');
      }
    }
  };

  return (
    <InnerWrapper>
      {editEvent
        ? <EditEvent
          setEditEvent={setEditEvent}
          editEvent={editEvent}
          eventDate={eventDate}
          setCounty={setCounty}
          setTempEventInfoForEdit={setTempEventInfoForEdit}
          tempEventInfoForEdit={tempEventInfoForEdit}
          onFormSubmit={onFormSubmit} />
        : <CreateEvent
          setHandleEvent={setHandleEvent}
          eventDate={eventDate}
          handleDateSelection={handleDateSelection}
          setTempEventInfoForEdit={setTempEventInfoForEdit}
          tempEventInfoForEdit={tempEventInfoForEdit}
          onFormSubmit={onFormSubmit} />}
    </InnerWrapper>
  );
};

export default EventReusableLogic;
