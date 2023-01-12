/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useSelector } from 'react-redux'
import { StyledEventCardContainer } from 'styles/Containers'
import styled from 'styled-components'
import EventCard from './events/EventCard'

const UserEvents = () => {
  const UserHostingEvents = useSelector((store) => store.user.userInfo.hostingEvents)

  const hostingEvents = UserHostingEvents.map((event) => {
    return (
      <EventCard
        key={event._id}
        game={event.game}
        venue={event.venue}
        openSpots={event.openSpots}
        totalSpots={event.totalSpots}
        eventDate={event.eventDate}
        isHost />
    )
  })
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
  margin-bottom: 1rem;
  

  @media (min-width: 1024px) {
    max-height: 25rem;
    overflow-y: auto;
  }
`

