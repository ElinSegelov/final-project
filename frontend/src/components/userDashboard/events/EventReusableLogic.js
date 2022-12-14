/* eslint-disable max-len */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable quote-props */

import React, { useEffect, useState } from 'react'
import { API_URL } from 'utils/utils';
import { batch, useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { swalBlurBackground } from 'utils/sweetAlerts';
import ui from 'reducers/ui';
import events from 'reducers/events';
import { InnerWrapper } from 'styles/Containers';
import EditEvent from './EditEvent';
import CreateEvent from './CreateEvent';

const EventReusableLogic = ({ setHandleEvent, editEvent, setEditEvent }) => {
  const [eventDate, setEventDate] = useState(new Date())
  const [eventTime, setEventTime] = useState('');
  const [eventName, setEventName] = useState(''); //! Saknas value / input
  const [venue, setVenue] = useState('');
  const [openSpots, setOpenSpots] = useState('');
  const [totalSpots, setTotalSpots] = useState('');
  const [description, setDescription] = useState('');
  const [tempEventInfoForEdit, setTempEventInfoForEdit] = useState({})
  const user = useSelector((store) => store.user.userInfo);
  const selectedGame = useSelector((store) => store.events.selectedGameWithDataFromAPI);
  const selectedEventForEdit = useSelector((store) => store.events.selectedEventForEdit)

  let gameName;
  const dispatch = useDispatch()
  console.log(tempEventInfoForEdit)

  useEffect(() => {
    if (editEvent) {
      setTempEventInfoForEdit(selectedEventForEdit)
    }
  }, [selectedEventForEdit, editEvent])

  const handleDateSelection = (date) => {
    setEventDate(date)
  }

  const handleEventValidation = () => {
    dispatch(ui.actions.setLoading(false))
    if (editEvent) {
      swalBlurBackground(editEvent)
      setEditEvent(false)
      window.location.reload()
      if (selectedEventForEdit === tempEventInfoForEdit) {
        Swal.fire('No changes were made')
      }
    } else {
      swalBlurBackground(editEvent)
      setHandleEvent(false)
      window.location.reload()
    }
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    dispatch(ui.actions.setLoading(true))
    if (editEvent) {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.accessToken
        },
        body: JSON.stringify(
          tempEventInfoForEdit
        )
      }
      fetch(API_URL('event'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(events.actions.setHostingEvents(data.response.hostingEvents))
              console.log(data.response.hostingEvents)
              dispatch(events.actions.setError(null))
            })
          } else {
            batch(() => {
              dispatch(events.actions.setError(data.response))
            })
          }
        })
        .finally(() => handleEventValidation())
    } else {
      // The games sometimes have several titles. We check if there are more than one title, if so,
      // we find the primary one.
      if (selectedGame.name.length > 1) {
        const nameOfGame = selectedGame.name.find((nameGame) => nameGame.primary === 'true')
        gameName = nameOfGame.text;
      } else {
        gameName = selectedGame.name.text;
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.accessToken
        },
        body: JSON.stringify({
          hostId: user.userId,
          host: user.username,
          eventDate: eventDate.toISOString(),
          eventTime,
          eventName, // Saknas input
          venue,
          game: gameName,
          openSpots,
          totalSpots,
          description,
          image: selectedGame.image
        })
      }
      fetch(API_URL('event'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(events.actions.setHostingEvents(data.response.hostingEvents))
            dispatch(events.actions.setError(null))
          } else {
            dispatch(events.actions.setError(data.response))
          }
        })
        .finally(() => handleEventValidation())
    }
  }
  return (
    <InnerWrapper>
      {editEvent
        ? <EditEvent
          editEvent={editEvent}
          eventDate={eventDate}
          setTempEventInfoForEdit={setTempEventInfoForEdit}
          tempEventInfoForEdit={tempEventInfoForEdit}
          onFormSubmit={onFormSubmit} />
        : <CreateEvent
          totalSpots={totalSpots}
          eventDate={eventDate}
          setEventTime={setEventTime}
          setEventName={setEventName}
          setVenue={setVenue}
          setOpenSpots={setOpenSpots}
          setTotalSpots={setTotalSpots}
          setDescription={setDescription}
          handleDateSelection={handleDateSelection}
          onFormSubmit={onFormSubmit} />}
    </InnerWrapper>
  )
}

export default EventReusableLogic
