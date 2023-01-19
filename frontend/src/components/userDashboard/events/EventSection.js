/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import EventCalendar from 'components/EventCalendar';
import { BsPlusLg } from 'react-icons/bs';
import { ButtonReversed } from 'styles/Button.styles';
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
        ? <EventReusableLogic
            handleEvent={handleEvent}
            setHandleEvent={setHandleEvent}
            editEvent={editEvent} />
        : editEvent
          ? <EventReusableLogic
              editEvent={editEvent}
              setEditEvent={setEditEvent}
              setHandleEvent={setHandleEvent} />
          : <CalenderAndCardWrapper>
            <EventLocationSearch />
            <ToggleEditCreateButton type="button" onClick={() => setHandleEvent(true)}><BsPlusLg /> Create event</ToggleEditCreateButton>
            <EventCalendar />
            <EventCardContainer
              setHandleEvent={setHandleEvent}
              handleEvent={handleEvent}
              setEditEvent={setEditEvent}
              editEvent={editEvent} />
          </CalenderAndCardWrapper>}
    </SectionWrapper>
  )
}

export default EventSection;

const ToggleEditCreateButton = styled(ButtonReversed)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`
const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
  @media (min-width: 1024px) {
    position: relative;
    min-height: calc(100vh - 15vh);
    justify-content: center;
  }
`
