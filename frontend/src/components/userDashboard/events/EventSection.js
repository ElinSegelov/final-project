/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-closing-tag-location */
import EventCalendar from 'components/EventCalendar'
import React, { useState } from 'react'
import { Button1, TransparentButton } from 'styles/Button.styles'
import { InnerWrapper } from 'styles/Containers'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { IoIosCreate } from 'react-icons/io'
import styled from 'styled-components'
import EventCardContainer from './EventCardContainer'
import EventReusableLogic from './EventReusableLogic'

const EventSection = () => {
  const [handleEvent, setHandleEvent] = useState(false)
  const [editEvent, setEditEvent] = useState(false)

  return (
    <>
      <section hidden={editEvent}>
        {handleEvent
          ? <>
            <ToggleEditCreateButton type="button" onClick={() => setHandleEvent(false)}><RiDeleteBack2Fill /></ToggleEditCreateButton>
            <EventReusableLogic
              editEvent={editEvent}
              setHandleEvent={setHandleEvent} />
          </>
          : <>
            <ToggleEditCreateButton type="button" onClick={() => setHandleEvent(true)}><IoIosCreate /></ToggleEditCreateButton>
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
              setEditEvent={setEditEvent}
              setHandleEvent={setHandleEvent} />
            <ToggleEditCreateButton type="button" onClick={() => setEditEvent(false)}><RiDeleteBack2Fill /></ToggleEditCreateButton>
          </>
          : ''}
      </section>
    </>
  )
}

export default EventSection;

const ToggleEditCreateButton = styled(TransparentButton)`
  margin-top: 1rem;
  justify-self: right;
`