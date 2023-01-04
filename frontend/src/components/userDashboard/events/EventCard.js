/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react'
import styled from 'styled-components/macro'
import editIcon from 'assets/icons/icons8-pencil-30.png'
import { useSelector } from 'react-redux';
import EditEvent from './EditEvent';

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
  setHandleEvent,
  setEditEvent,
  editEvent
}) => {
  // Om inget eventnamn, visa endast game
  const user = useSelector((store) => store.user.userInfo.userId);

  const handleEditEvent = () => {
    setEditEvent(true)
  }

  return (
    <StyledEventCard>
      {user === hostId ? <button type="button" onClick={handleEditEvent}><img src={editIcon} alt="edit event" /></button> : ''}
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