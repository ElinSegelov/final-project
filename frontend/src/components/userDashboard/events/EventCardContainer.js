/* eslint-disable no-underscore-dangle */ // Ignores _ in _id
import React from 'react'
import { useSelector } from 'react-redux'
import { StyledEventCardContainer } from 'styles/Containers'
import EventCard from './EventCard'

const EventCardContainer = () => {
  // här ska vi mounta EventCard
  const eventsOfTheDay = useSelector((store) => store.events.eventsOfTheDay)

  const allEvents = eventsOfTheDay.map((event) => {
    return (
      <div key={event._id}>
        <EventCard
          game={event.game}
          host={event.host}
          venue={event.venue}
          openSpots={event.openSpots}
          totalSpots={event.totalSpots}
          isFull={event.isFull}
          description={event.description}
          eventName={event.eventName}
          eventTime={event.eventTime} />
      </div>
    )
  })
  return (
    <StyledEventCardContainer>{allEvents}</StyledEventCardContainer>
  )
}

export default EventCardContainer;