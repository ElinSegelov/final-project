/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-underscore-dangle */ // Ignores _ in _id
import React from 'react'
import { useSelector } from 'react-redux'
import { StyledEventCardContainer } from 'styles/Containers'
import styled from 'styled-components'
import EventCard from './EventCard'

const EventCardContainer = ({ setHandleEvent, setEditEvent }) => {
  const eventsOfTheDay = useSelector((store) => store.events.eventsOfTheDay)
  const selectedDate = useSelector((store) => store.events.selectedDate)

  const allEvents = eventsOfTheDay.map((event) => {
    return (
      <EventCard
        key={event._id}
        id={event._id}
        image={event.image}
        eventId={event._id}
        setEditEvent={setEditEvent}
        hostId={event.hostId}
        setHandleEvent={setHandleEvent}
        game={event.game}
        host={event.host}
        venue={event.venue}
        openSpots={event.openSpots}
        totalSpots={event.totalSpots}
        isFull={event.isFull}
        description={event.description}
        eventName={event.eventName}
        eventTime={event.eventTime} />
    )
  })

  return (
    <ActiveEventSection>
      <EventsHeading>
        {eventsOfTheDay.length > 0 ? <h3>Events on {selectedDate.slice(0, 10)}</h3> : null}
      </EventsHeading>
      <StyledEventCardContainer>
        {allEvents}
      </StyledEventCardContainer>
    </ActiveEventSection>
  )
}

export default EventCardContainer;

//! Vi borde inte ha en länk runt en knapp (rad 45). Jag har gjort så så länge för det strulade när jag
//! förökte lägga navigate på onclick

const ActiveEventSection = styled.section`
  margin-bottom: 1rem;
  

  @media (min-width: 1024px) {
    max-height: 25rem;
    overflow-y: auto;
  }
`

const EventsHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
`