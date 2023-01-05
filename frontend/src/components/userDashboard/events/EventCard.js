/* eslint-disable quote-props */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react'
import styled from 'styled-components/macro'
import editIcon from 'assets/icons/icons8-pencil-30.png'
import deleteIcon from 'assets/icons/delete-icon.png'
import { useDispatch, useSelector } from 'react-redux';
import events from 'reducers/events';
import { API_URL } from 'utils/utils';
import Swal from 'sweetalert2'

const EventCard = ({
  game,
  host,
  venue,
  openSpots,
  totalSpots,
  isFull,
  description,
  eventName,
  eventTime,
  hostId,
  setEditEvent,
  eventId,
  setHandleEvent
}) => {
  // Om inget eventnamn, visa endast game
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.userInfo);
  const eventsOfTheDay = useSelector((store) => store.events.eventsOfTheDay)
  // This ⬇ compares the clicked event with the event id
  const selectedEventForEditOrRemove = eventsOfTheDay.find((event) => eventId === event._id)

  // This ⬇ saves the filtered resulting event in event reducer
  const handleEditEvent = () => {
    dispatch(events.actions.setSelectedEventForEdit(selectedEventForEditOrRemove))
    setEditEvent(true)
    console.log('selectedEventForEdit', selectedEventForEditOrRemove)
  }

  const handleDeleteEvent = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.accessToken
      },
      body: JSON.stringify({
        eventId: selectedEventForEditOrRemove._id
      })
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(API_URL('event'), options)
        Swal.fire(
          'Deleted!',
          'Your event has been deleted.',
          'success'
        )/* .then(setTimeout(window.location.reload()), 3000) */ // Kanske går att göra via state på calendar?
        // timeout not working properly?
      }
    })
  }

  return (
    <StyledEventCard>
      {user.userId === hostId
        ?
        <section>
          <button type="button" onClick={(handleEditEvent)}><img src={editIcon} alt="edit event" /></button>
          <button type="button" onClick={(handleDeleteEvent)}><DeleteImg src={deleteIcon} alt="delete event" /></button>
        </section>
        : ''}
      <h3>{eventName} - {game}</h3>
      <p>{venue}</p>
      <p>{host}</p>
      <p>{isFull ? 'Event is full' : `${openSpots} / ${totalSpots}`}</p>
      <p>{description}</p>
      <p>{eventTime}</p>
    </StyledEventCard>
  )
}

export default EventCard

const StyledEventCard = styled.div`
  width: 100%;
`

const DeleteImg = styled.img`
  width: 24px;
  height: 24px
`