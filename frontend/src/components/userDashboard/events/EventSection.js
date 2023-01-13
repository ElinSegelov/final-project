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
      <SectionWrapper style={{ display: editEvent ? 'none' : 'flex' }}>
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
            <ToggleEditCreateButton type="button" onClick={() => setEditEvent(false)}><RiDeleteBack2Fill /></ToggleEditCreateButton>
            <EventReusableLogic
              editEvent={editEvent}
              setEditEvent={setEditEvent}
              setHandleEvent={setHandleEvent} />
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
  @media(min-width: 1024px) {
    position: absolute;
    left: 1rem;
  }
`

const SectionWrapper = styled.section`
  @media (min-width: 1024px) {
    max-width: 100%;
    justify-content: center;
    display: flex;
    position: relative;
  }
`
// const SectionWrapper1 = styled.section`
//   @media (min-width: 1024px) {
//     max-width: 100%;
//     //display: flex;
//     justify-content: center;
//   }
// `

const CalenderAndCardWrapperDesktop = styled.div`
  width: fit-content;
  margin: 1rem auto;
  @media (min-width: 1025px) {
    //max-width: 500px;
  }
`