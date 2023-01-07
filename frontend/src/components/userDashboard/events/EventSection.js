/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-closing-tag-location */
import EventCalendar from 'components/EventCalendar'
import React, { useState } from 'react'
import { Button1, ButtonReversed } from 'styles/Button.styles'
import { InnerWrapper } from 'styles/Containers'
import EventCardContainer from './EventCardContainer'
import EventReusableLogic from './EventReusableLogic'

const EventSection = () => {
  const [handleEvent, setHandleEvent] = useState(false)
  const [editEvent, setEditEvent] = useState(false)

  return (
    <>
      <InnerWrapper hidden={editEvent}>
        {handleEvent
          ? <>
            <EventReusableLogic
              editEvent={editEvent}
              setHandleEvent={setHandleEvent} />
            <ButtonReversed type="button" onClick={() => setHandleEvent(false)}>X</ButtonReversed>
          </>
          : <>
            <Button1 type="button" onClick={() => setHandleEvent(true)}>Create</Button1>
            <EventCalendar />
            <EventCardContainer
              setHandleEvent={setHandleEvent}
              setEditEvent={setEditEvent}
              editEvent={editEvent} />
          </>}
      </InnerWrapper>
      <InnerWrapper>
        {editEvent
          ? <>
            <EventReusableLogic
              editEvent={editEvent}
              setEditEvent={setEditEvent}
              setHandleEvent={setHandleEvent} />
            <ButtonReversed type="button" onClick={() => setEditEvent(false)}>X</ButtonReversed></>
          : ''}
      </InnerWrapper>
    </>
  )
}

export default EventSection;