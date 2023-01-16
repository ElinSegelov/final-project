/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';
import { StyledEventCardContainer } from 'styles/Containers';
import styled from 'styled-components/macro';
import EventCard from './events/EventCard';

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
    <UserEventSection>
      <UsersEventCardsContainer>
        {hostingEvents}
      </UsersEventCardsContainer>
    </UserEventSection>
  )
}

export default UserEvents;

const UserEventSection = styled.section`
  display: none;  

  @media (min-width: 1024px) {
    max-height: 100%;
    overflow-y: auto;
    display: block;

  }
`
const UsersEventCardsContainer = styled(StyledEventCardContainer)`
  @media (min-width: 1024px) {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    width:100%;
  }
`

