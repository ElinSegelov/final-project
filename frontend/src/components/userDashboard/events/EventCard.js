import React from 'react'
import styled from 'styled-components/macro'

const EventCard = ({
  game,
  host,
  venue,
  openSpots,
  totalSpots,
  isFull,
  description,
  eventName,
  eventTime
}) => {
  // Om inget eventnamn, visa endast game
  return (
    <StyledEventCard>
      <h3>{eventName} - {game}</h3>
      <p>{venue}</p>
      <p>{host}</p>
      <p>{isFull ? 'Event is full' : `${openSpots} / ${totalSpots}`}</p>
      <p>{description}This is a description</p>
      <p>{eventTime}</p>
    </StyledEventCard>
  )
}

export default EventCard

const StyledEventCard = styled.div`
  width: 100%;
`