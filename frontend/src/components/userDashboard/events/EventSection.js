/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-closing-tag-location */
import EventCalendar from 'components/EventCalendar'
import React, { useState } from 'react'
import { Button1, TransparentButton } from 'styles/Button.styles'
import { InnerWrapper } from 'styles/Containers'
import { RiDeleteBack2Fill } from 'react-icons/ri'
// import { IoIosCreate } from 'react-icons/io'
import { BsPlusLg } from 'react-icons/bs'
import styled from 'styled-components/macro'
import EventCardContainer from './EventCardContainer'
import EventReusableLogic from './EventReusableLogic'

const EventSection = () => {
  const [handleEvent, setHandleEvent] = useState(false)
  const [editEvent, setEditEvent] = useState(false)

  return (
    <>
      <SectionWrapper hidden={editEvent}>
        {handleEvent
          ? <>
            <ToggleEditCreateButton type="button" onClick={() => setHandleEvent(false)}><RiDeleteBack2Fill /></ToggleEditCreateButton>
            <EventReusableLogic
              editEvent={editEvent}
              setHandleEvent={setHandleEvent} />
          </>
          : <>
            <ToggleEditCreateButton type="button" onClick={() => setHandleEvent(true)}><BsPlusLg /></ToggleEditCreateButton>
            <CalenderAndCardWrapperDesktop>
              <EventCalendar />
              <EventCardContainer
                setHandleEvent={setHandleEvent}
                setEditEvent={setEditEvent}
                editEvent={editEvent} />
            </CalenderAndCardWrapperDesktop>
          </>}
      </SectionWrapper>
      <SectionWrapper>
        {editEvent
          ? <>
            <EventReusableLogic
              editEvent={editEvent}
              setEditEvent={setEditEvent}
              setHandleEvent={setHandleEvent} />
            <ToggleEditCreateButton type="button" onClick={() => setEditEvent(false)}><RiDeleteBack2Fill /></ToggleEditCreateButton>
          </>
          : ''}
      </SectionWrapper>
    </>
  )
}

export default EventSection;

const ToggleEditCreateButton = styled(TransparentButton)`
  margin-top: 1rem;
  justify-self: right;
`

const SectionWrapper = styled.section`
  @media (min-width: 768px) {
    max-width: 500px;
    /* display: flex;
    flex-direction: column;
    width: 500px;
    height: 100vh;
    border-right: 1px solid var(--orangeRed);
    padding-right: 1rem;
    border: 1px solid red; */
  }
`

const CalenderAndCardWrapperDesktop = styled.div`
  @media (min-width: 768px) {
    max-width: 500px;
  }
`