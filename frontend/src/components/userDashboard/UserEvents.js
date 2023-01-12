/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useSelector } from 'react-redux'
import { StyledEventCardContainer } from 'styles/Containers'
import styled from 'styled-components/macro'
import EventCard from './events/EventCard'

const UserEvents = () => {
  const userHostingEvents = useSelector((store) => store.user.userInfo.hostingEvents)
  const hostingEvents = []

  if (userHostingEvents) {
    const tempArrayForEvents = userHostingEvents.map((event) => {
      return (
        <EventCard
          key={event._id}
          game={event.game}
          venue={event.venue}
          openSpots={event.openSpots}
          totalSpots={event.totalSpots}
          eventDate={event.eventDate.slice(0, 10)}
          isHost />
      )
    })
    hostingEvents.push(tempArrayForEvents)
  }
  return (
    <ActiveEventSection>
      <StyledEventCardContainer>
        {hostingEvents}
      </StyledEventCardContainer>
    </ActiveEventSection>
  )
}

export default UserEvents;

const ActiveEventSection = styled.section`
  display: none;  

  @media (min-width: 1024px) {
    max-height: 25rem;
    overflow-y: auto;
    display: block;
  }
`

