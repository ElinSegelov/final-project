/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-underscore-dangle */ // Ignores _ in _id
import React from 'react'
import { useSelector } from 'react-redux'
import { StyledEventCardContainer } from 'styles/Containers'
import { Link } from 'react-router-dom'
import EventCard from './EventCard'

const EventCardContainer = ({ setHandleEvent, setEditEvent }) => {
  // här ska vi mounta EventCard
  const eventsOfTheDay = useSelector((store) => store.events.eventsOfTheDay)
  const selectedDate = useSelector((store) => store.events.selectedDate)
  console.log(selectedDate)
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
    <StyledEventCardContainer>
      {eventsOfTheDay.length > 0 ? <h2>Events on {selectedDate.slice(0, 10)}</h2> : null}
      {allEvents}
      {eventsOfTheDay.length > 0 ? <Link to="/login">Login for full event information</Link> : null}
    </StyledEventCardContainer>
  )
}

export default EventCardContainer;