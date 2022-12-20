import EventCalendar from 'components/EventCalendar'
import React from 'react'
import EventCardContainer from './EventCardContainer'

const EventSection = () => {
  return (
    <section>
      <EventCalendar />
      <EventCardContainer />
    </section>
  )
}

export default EventSection