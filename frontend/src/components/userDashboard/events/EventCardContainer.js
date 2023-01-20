/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-underscore-dangle */ // Ignores _ in _id
import React from 'react';
import { useSelector } from 'react-redux';
import { StyledEventCardContainer } from 'styles/Containers';
import styled from 'styled-components/macro';
import EventCard from './EventCard';

const EventCardContainer = ({ setHandleEvent, setEditEvent, unAutohrized }) => {
  const eventsOfTheDay = useSelector((store) => store.events.eventsOfTheDay);
  const selectedDate = useSelector((store) => store.events.selectedDate);
  const countyFilter = useSelector((store) => store.events.countyFilter);
  const allEvents = [];

  const eventsOfTheDayInSelectedCounty = eventsOfTheDay.filter((event) => event.county === countyFilter);
  // If no specific county is selected, allEvents is replaced with previous value of eventsOfTheDay
  if (countyFilter === 'All') {
    allEvents.push(...allEvents, eventsOfTheDay.map((event) => {
      return (
        <EventCard
          key={event._id}
          id={event._id}
          image={event.image}
          eventId={event._id}
          setEditEvent={setEditEvent}
          hostId={event.hostId}
          setHandleEvent={setHandleEvent}
          game={event.game}
          host={event.host}
          county={event.county}
          venue={event.venue}
          openSpots={event.openSpots}
          totalSpots={event.totalSpots}
          isFull={event.isFull}
          description={event.description}
          eventName={event.eventName}
          eventTime={event.eventTime} />
      );
    }));
  } else {
    // If a specific county is selected, allEvents is replaced with eventsFilterdByCounty
    const eventsFilterdByCounty = eventsOfTheDay.filter((event) => event.county === countyFilter);
    allEvents.push(...allEvents, eventsFilterdByCounty.map((event) => {
      return (
        <EventCard
          key={event._id}
          id={event._id}
          image={event.image}
          eventId={event._id}
          setEditEvent={setEditEvent}
          hostId={event.hostId}
          setHandleEvent={setHandleEvent}
          game={event.game}
          host={event.host}
          county={event.county}
          venue={event.venue}
          openSpots={event.openSpots}
          totalSpots={event.totalSpots}
          isFull={event.isFull}
          description={event.description}
          eventName={event.eventName}
          eventTime={event.eventTime} />
      );
    }));
  }
  return (
    <ActiveEventSection>
      <EventsHeading>
        {(countyFilter === 'All' && eventsOfTheDay.length > 0) || (eventsOfTheDayInSelectedCounty.length > 0)
          ? <h3>Events on {selectedDate.slice(0, 10)}</h3>
          : null}
      </EventsHeading>
      {unAutohrized
        ? <LandingpageEventContainer>
          {allEvents}
        </LandingpageEventContainer>
        : <LogedInEventContainer>
          {allEvents}
        </LogedInEventContainer>}
    </ActiveEventSection>
  );
};

export default EventCardContainer;

const ActiveEventSection = styled.section`
  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    width: 100%;
    max-width: 60rem;
    max-height: 36rem;
  }
`
const LandingpageEventContainer = styled(StyledEventCardContainer)`
  @media (min-width: 1024px) {
    display: flex;
    width: 30rem;
    min-height: 100%;
  }
`
const LogedInEventContainer = styled(StyledEventCardContainer)`
  @media (min-width: 1024px) {
    display: flex;
    width: 100%
  }
  
  @media (min-width: 1400px) {
    width: 57rem;
    align-items: left;
    display: grid;
    grid-template-columns: repeat(2, 49%);
    grid-auto-flow: row;
    min-height: 100%;
  }
`
const EventsHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
`