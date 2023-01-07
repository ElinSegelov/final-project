/* eslint-disable operator-linebreak */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */

import React from 'react'
import styled from 'styled-components/macro'
import { Button1 } from 'styles/Button.styles'
import editIcon from 'assets/icons/icons8-pencil-30.png'
import deleteIcon from 'assets/icons/delete-icon.png'
import { useDispatch, useSelector } from 'react-redux';
import events from 'reducers/events';
import { API_URL } from 'utils/utils';
import Swal from 'sweetalert2'

const EventCard = ({
  id,
  game,
  host,
  venue,
  openSpots,
  totalSpots,
  isFull,
  description,
  eventName,
  eventTime,
  image,
  hostId,
  setEditEvent,
  eventId
  // setHandleEvent
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
        )
      }
    })
  }

  const loggedInUser = useSelector((store) => store.user.userInfo.accessToken)
  if (loggedInUser) {
    return (
      <StyledEventCard key={id}>
        {user.userId === hostId
          ?
          <section>
            <button type="button" onClick={(handleEditEvent)}><img src={editIcon} alt="edit event" /></button>
            <button type="button" onClick={(handleDeleteEvent)}><DeleteImg src={deleteIcon} alt="delete event" /></button>
          </section>
          : ''}
        <GameImage src={image} alt={game} />
        <EventInfo>
          <h3>{eventName} - {game}</h3>
          <p><span>Host:</span> {host}</p>
          <p><span>Where?</span> {venue}</p>
          <p><span>When?</span> {eventTime}</p>
          <p><span>Open spots:</span>{isFull ? 'Event is full' : ` ${openSpots} / ${totalSpots}`}</p>
        </EventInfo>
        <DescriptionParagraph>{description}</DescriptionParagraph>
      </StyledEventCard>
    )
  } else {
    return (
      <EventCardWithBasicInfo key={id}>
        <h3>{game}</h3>
        <EventInfo>
          <p><span>Location:</span> {venue}</p>
          <p><span>Time:</span> {eventTime}</p>
        </EventInfo>
        <Button1 type="button">Login to see all info</Button1>
      </EventCardWithBasicInfo>
    )
  }
}

export default EventCard

const StyledEventCard = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 40% 60%;
  align-items: center;
  row-gap: 0.25rem;
  line-height: 1.2;
  background-color: #363c46;
  border-radius: 0.6rem;
`

const GameImage = styled.img`
  width: 8rem;
  
`
const EventCardWithBasicInfo = styled(StyledEventCard)`
  grid-template-columns: 1fr 1fr;
div {
  grid-column: 2;
}
`
const EventInfo = styled.div`
  span, h3 {
    color: #DE605B;
  }
`
const DescriptionParagraph = styled.p`
  grid-column: 1 / 3;
`

const DeleteImg = styled.img`
  width: 24px;
  height: 24px;
`