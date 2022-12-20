import React from 'react'
import { useSelector } from 'react-redux'

const EventCardContainer = () => {
  // här ska vi mounta EventCard
  const eventInfo = useSelector((store) => store.events)

  const selectDateEvents = eventInfo.postedEvents.filter(
    (event) => event.eventDate === eventInfo.selectedDate
  )

  console.log(selectDateEvents)

  return (
    <div>EventCardContainer</div>
  )
}

export default EventCardContainer