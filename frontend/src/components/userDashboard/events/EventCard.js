/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable operator-linebreak */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import styled from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux';
import events from 'reducers/events';
import { API_URL } from 'utils/utils';
import Swal from 'sweetalert2';
import { RiEdit2Fill, RiWindowLine } from 'react-icons/ri'
import { MdLocationOn, MdDelete } from 'react-icons/md'
import { IoMdTime } from 'react-icons/io'
import { GiCastle } from 'react-icons/gi'
import { HiUserGroup, HiClock } from 'react-icons/hi'

import { TransparentButton } from 'styles/Button.styles';
import ApplyToEvent from './ApplyToEvent'

const EventCard = ({
  id,
  hostId,
  eventId,
  game,
  host,
  venue,
  openSpots,
  totalSpots,
  isFull,
  description,
  eventName,
  eventTime,
  eventDate,
  image,
  setEditEvent,
  setHandleEvent,
  isHost
}) => {
  //! Om inget eventnamn, visa endast -game
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.userInfo);
  const eventsOfTheDay = useSelector((store) => store.events.eventsOfTheDay)
  // This ⬇ compares the clicked event with the event id
  const selectedEventForEditOrRemove = eventsOfTheDay.find((event) => eventId === event._id)

  // This ⬇ saves the filtered resulting event in event reducer
  const handleEditEvent = () => {
    dispatch(events.actions.setSelectedEventForEdit(selectedEventForEditOrRemove))
    setEditEvent(true)
    setHandleEvent(false)
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
      background: 'transparent',
      color: '#DE605B',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
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
          .finally(() => {
            Swal.fire(
              'Deleted!',
              'Your event has been deleted.',
              'success'
            )
            window.location.reload()
          })
      }
    })
  }

  const loggedInUser = useSelector((store) => store.user.userInfo.accessToken)
  if (loggedInUser && isHost) {
    return (
      <EventCardWithBasicInfo key={id}>
        <GameTitleWrapperLimited>
          <h3>{game}</h3>
        </GameTitleWrapperLimited>
        <EventInfo>
          <p><MdLocationOn /> {venue}</p>
          <p><IoMdTime /> {eventDate}</p>
        </EventInfo>
      </EventCardWithBasicInfo>
    )
  } else if (loggedInUser) {
    return (
      <StyledEventCard key={id}>
        <GameImageContainer>
          <GameImage src={image} alt={game} />
        </GameImageContainer>
        <EventInfo>
          {/* <h3>{eventName} - {game}</h3> */}
          <GameTitleWrapper>
            <h3>{game}</h3>
          </GameTitleWrapper>
          <p><GiCastle /> {host}</p>
          <p><MdLocationOn /> {venue}</p>
          <p><HiClock /> {eventTime}</p>
          <p><HiUserGroup />{isFull ? 'Event is full' : ` ${totalSpots - openSpots} / ${totalSpots}`}</p>
        </EventInfo>
        <DescriptionParagraph>{description}</DescriptionParagraph>
        {user.userId === hostId
          ?
          <HandleEventContainer>
            <TransparentButton type="button" onClick={(handleDeleteEvent)}><MdDelete /></TransparentButton>
            <TransparentButton type="button" onClick={(handleEditEvent)}><RiEdit2Fill /></TransparentButton>
          </HandleEventContainer>
          : <ApplyToEvent eventId={id} eventHost={host} />}
      </StyledEventCard>
    )
  } else {
    return (
      <EventCardWithBasicInfo key={id}>
        <GameTitleWrapperLimited>
          <h3>{game}</h3>
        </GameTitleWrapperLimited>
        <EventInfo>
          <p><MdLocationOn /> {venue}</p>
          <p><IoMdTime /> {eventTime}</p>
        </EventInfo>
      </EventCardWithBasicInfo>
    )
  }
}

export default EventCard;

const GameTitleWrapper = styled.div`
  max-width: 100%;
  word-wrap: break-word;
  max-height: 3rem;
  overflow-y: auto;
  `

const GameTitleWrapperLimited = styled(GameTitleWrapper)`
  max-height: 4rem;
  overflow-y: hidden;
`

const StyledEventCard = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 40% 50% 5%;
  align-items: center;
  line-height: 1.2;
  background-color: #363c46;
  border-radius: 0.6rem;
  column-gap: 0.5rem;
  row-gap: 0.25rem;
  position: relative;

  @media (min-width: 1024px) {
    width:30rem;
    align-items: left;
  }
`
const HandleEventContainer = styled.section`
  grid-column: 1 / 3;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1rem;
  right: -2rem;
`

const GameImageContainer = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;

  `
const GameImage = styled.img`
  object-fit: contain;
  width: 100%;
`
const EventCardWithBasicInfo = styled(StyledEventCard)`
  grid-template-columns: 1fr 1fr;

  @media(min-width: 1024px) {
    display: block;
    width: 100%;
  }
`
const EventInfo = styled.div`
  h3 {
    vertical-align: text-top;
    
  }
  span, h3 {
    color: #DE605B;
  }

  
`
const DescriptionParagraph = styled.p`
  grid-column: 1 / 4;
  word-wrap: break-word;
`