/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-closing-tag-location */
import EventCalendar from 'components/EventCalendar'
import React, { useState } from 'react'
import { Button1, ButtonReversed } from 'styles/Button.styles'
import { InnerWrapper } from 'styles/Containers'
import EventCardContainer from './EventCardContainer'
import EditEvent from './EditEvent'
import SelectedEvent from './SelectedEvent'
import EventReusableLogic from './EventReusableLogic'
import CreateEvent from './CreateEvent'

const EventSection = () => {
  const [handleEvent, setHandleEvent] = useState(false)
  const [editEvent, setEditEvent] = useState(false)

  return (
    <>
      <section hidden={editEvent}>
        {handleEvent
          ? <>
            <EventReusableLogic
              editEvent={editEvent}
              setHandleEvent={setHandleEvent} />
            <button type="button" onClick={() => setHandleEvent(false)}>X</button>
          </>
          : <>
            <button type="button" onClick={() => setHandleEvent(true)}>create</button>
            <EventCalendar />
            <EventCardContainer
              setHandleEvent={setHandleEvent}
              setEditEvent={setEditEvent}
              editEvent={editEvent} />
          </>}
      </section>
      <section>
        {editEvent
          ? <>
            <EventReusableLogic
              editEvent={editEvent}
              setHandleEvent={setHandleEvent} />
            <button type="button" onClick={() => setEditEvent(false)}>X</button></>
          : ''}
      </section>
    </>
  )
}

export default EventSection;

// const EventSection