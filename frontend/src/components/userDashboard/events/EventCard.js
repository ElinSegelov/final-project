import React from 'react'
import styled from 'styled-components/macro'

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
  image
}) => {
  // Om inget eventnamn, visa endast game
  return (
    <StyledEventCard key={id}>
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
  
`

const GameImage = styled.img`
  width: 8rem;
  
`
const EventInfo = styled.div`
  span, h3 {
    color: #DE605B;
  }
`
const DescriptionParagraph = styled.p`
  grid-column: 1 / 3;
`