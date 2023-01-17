/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import EventCalendar from 'components/EventCalendar';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { BsPlusLg } from 'react-icons/bs';
import { ButtonReversed, TransparentButton } from 'styles/Button.styles';
import { CalenderAndCardWrapper } from 'styles/Containers';
import styled from 'styled-components/macro';
import EventCardContainer from './EventCardContainer';
import EventReusableLogic from './EventReusableLogic';
import EventLocationSearch from './EventLocationSearch';

const EventSection = () => {
  const [handleEvent, setHandleEvent] = useState(false)
  const [editEvent, setEditEvent] = useState(false)

  return (
    <SectionWrapper>
      {handleEvent
        ? <>
          <ToggleEditCreateButton type="button" onClick={() => setHandleEvent(false)}><RiDeleteBack2Fill /></ToggleEditCreateButton>
          <EventReusableLogic
            editEvent={editEvent}
            setHandleEvent={setHandleEvent} />
        </>
        : editEvent
          ? <>
            <ToggleEditCreateButton type="button" onClick={() => setEditEvent(false)}><RiDeleteBack2Fill /></ToggleEditCreateButton>
            <EventReusableLogic
              editEvent={editEvent}
              setEditEvent={setEditEvent}
              setHandleEvent={setHandleEvent} />
          </>
          : <CalenderAndCardWrapper>
            <EventLocationSearch />
            <ToggleEditCreateButton type="button" onClick={() => setHandleEvent(true)}><BsPlusLg /> Create event</ToggleEditCreateButton>
            <EventCalendar />
            <EventCardContainer
              setHandleEvent={setHandleEvent}
              setEditEvent={setEditEvent}
              editEvent={editEvent} />
          </CalenderAndCardWrapper>}
    </SectionWrapper>
  )
}

export default EventSection;

const ToggleEditCreateButton = styled(ButtonReversed)`
  /* @media(min-width: 1024px) {
    position: absolute;
    left: 1rem;
  } */
`
const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
  @media (min-width: 1024px) {
    position: relative;
  }
`
