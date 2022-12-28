/* eslint-disable react/jsx-closing-tag-location */
import EventCalendar from 'components/EventCalendar'
import React, { useState } from 'react'
import EventCardContainer from './EventCardContainer'
import CreateEventForm from './CreateEventForm'

const EventSection = () => {
  const [handleEvent, setHandleEvent] = useState(false)

  return (
    <section>
      {handleEvent
        ? <>
          <CreateEventForm />
          <button type="button" onClick={() => setHandleEvent(false)}>X</button>
        </>
        : <>
          <button type="button" onClick={() => setHandleEvent(true)}>create</button>
          <EventCalendar />
          <EventCardContainer />
        </>}

    </section>
  )
}

export default EventSection