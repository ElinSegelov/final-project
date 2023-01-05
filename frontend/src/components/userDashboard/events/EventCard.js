import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import { Button1 } from 'styles/Button.styles'

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
  const loggedInUser = useSelector((store) => store.user.userInfo.accessToken)
  if (loggedInUser) {
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