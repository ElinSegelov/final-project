/* eslint-disable react/jsx-closing-tag-location */
import EventCalendar from 'components/EventCalendar'
import React, { useState } from 'react'
import { Button1, ButtonReversed } from 'styles/Button.styles'
import { InnerWrapper } from 'styles/Containers'
import EventCardContainer from './EventCardContainer'
import CreateEventForm from './CreateEventForm'

const EventSection = () => {
  const [handleEvent, setHandleEvent] = useState(false)

  return (
    <InnerWrapper>
      {handleEvent
        ? <>
          <ButtonReversed type="button" onClick={() => setHandleEvent(false)}>Go Back</ButtonReversed>
          <CreateEventForm setHandleEvent={setHandleEvent} />
        </>
        : <>
          <Button1 type="button" onClick={() => setHandleEvent(true)}>Create Event</Button1>
          <EventCalendar />
          <EventCardContainer />
        </>}

    </InnerWrapper>
  )
}

export default EventSection;

// const EventSection