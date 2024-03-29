/* eslint-disable operator-linebreak */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Swal from 'sweetalert2';
import events from 'reducers/events';
import user from 'reducers/user'
import styled from 'styled-components/macro';
import { swalInformation } from 'utils/sweetAlerts';
import { batch, useDispatch, useSelector } from 'react-redux';
import { RiEdit2Fill } from 'react-icons/ri';
import { IoMdTime } from 'react-icons/io';
import { MdLocationOn, MdDelete } from 'react-icons/md';
import { GiClosedBarbute } from 'react-icons/gi';
import { HiUserGroup, HiClock } from 'react-icons/hi';
import { BsHouseFill } from 'react-icons/bs';
import { API_URL } from 'utils/urls';
import { TransparentButton } from 'styles/Button.styles';
import ApplyToEvent from './ApplyToEvent';

const EventCard = ({
  hostId,
  eventId,
  game,
  host,
  county,
  venue,
  openSpots,
  totalSpots,
  isFull,
  description,
  eventTime,
  eventDate,
  image,
  setEditEvent,
  isHost
}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user.userInfo);
  const eventsOfTheDay = useSelector((store) => store.events.eventsOfTheDay);
  // Compares the clicked event with the event id
  const selectedEventForEditOrRemove = eventsOfTheDay.find((event) => eventId === event._id);

  // Saves the filtered resulting event in event reducer
  const handleEditEvent = () => {
    dispatch(events.actions.setSelectedEventForEdit(selectedEventForEditOrRemove));
    setEditEvent(true);
  }
  const handleValidation = (success) => {
    if (success) {
      swalInformation('Deleted!', 'Your event has been deleted.', 'success', 2000);
    } else {
      swalInformation('Something went wrong!', 'Event could not be deleted. Try again', 'error', 2000);
    }
    setTimeout(() => { window.location.reload() }, 2000);
  }
  const handleDeleteEvent = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': userInfo.accessToken
      },
      body: JSON.stringify({
        eventId: selectedEventForEditOrRemove._id
      })
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      background: 'transparent',
      color: '#DE605B',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(API_URL('event'), options)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              batch(() => {
                dispatch(user.actions.changeToHostingEvents(data.response.hostingEvents));
                dispatch(events.actions.setError(null));
                handleValidation(data.success);
              })
            } else {
              batch(() => {
                dispatch(events.actions.setError(data.response));
                handleValidation(data.success);
              })
            }
          })
          .catch((err) => {
            console.error(err.stack);
          })
      }
    });
  };

  const loggedInUser = useSelector((store) => store.user.userInfo.accessToken);
  if (loggedInUser && isHost) {
    return (
      <EventCardWithBasicInfo key={eventId}>
        <GameTitleWrapperLimited>
          <h3>{game}</h3>
        </GameTitleWrapperLimited>
        <EventInfo>
          <p><BsHouseFill /> {venue}</p>
          <p><IoMdTime /> {eventDate}</p>
        </EventInfo>
      </EventCardWithBasicInfo>
    );
  } else if (loggedInUser) {
    return (
      <StyledEventCard key={eventId}>
        <GameImageContainer>
          <GameImage src={image} alt={game} />
        </GameImageContainer>
        <EventInfo>
          <GameTitleWrapper>
            <h3>{game}</h3>
          </GameTitleWrapper>
          <InfoWrapper>
            <p><GiClosedBarbute /> {host}</p>
            <p><MdLocationOn /> {county}</p>
            <p><BsHouseFill /> {venue}</p>
            <p><HiClock /> {eventTime}</p>
            <p><HiUserGroup />{isFull ? 'Event is full' : ` ${totalSpots - openSpots} / ${totalSpots}`}</p>
          </InfoWrapper>
        </EventInfo>
        <DescriptionParagraph>{description}</DescriptionParagraph>
        {userInfo.userId === hostId
          ?
          <HandleEventContainer>
            <TransparentButton type="button" onClick={(handleDeleteEvent)}><MdDelete /></TransparentButton>
            <TransparentButton type="button" onClick={(handleEditEvent)}><RiEdit2Fill /></TransparentButton>
          </HandleEventContainer>
          : <ApplyToEvent eventId={eventId} eventHost={host} />}
      </StyledEventCard>
    );
  } else {
    return (
      <EventCardWithBasicInfo key={eventId}>
        <GameTitleWrapperLimited>
          <h3>{game}</h3>
        </GameTitleWrapperLimited>
        <EventInfo>
          <p><MdLocationOn /> {county}</p>
          <p><IoMdTime /> {eventTime}</p>
        </EventInfo>
      </EventCardWithBasicInfo>
    );
  }
};

export default EventCard;

const InfoWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
row-gap: 0.1rem;

  p {
    display: flex;
    align-items: center;
    column-gap: 0.5rem
  }
`
const GameTitleWrapper = styled.div`
  max-width: 100%;
  word-wrap: break-word;
  max-height: 3rem;
  overflow-y: auto;
  `
const GameTitleWrapperLimited = styled(GameTitleWrapper)`
  max-height: 4rem;
  overflow-y: hidden;
`
const StyledEventCard = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 40% 50% 6.5%;
  align-items: center;
  line-height: 1.2;
  background-color: #363c46;
  border-radius: 0.6rem;
  column-gap: 0.5rem;
  row-gap: 0.25rem;
  position: relative;

  @media (min-width: 768px) {
    width: 30rem;
  }
  @media (min-width: 1400px) {
    width:100%;
  }
`
const HandleEventContainer = styled.section`
  grid-column: 1 / 3;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1rem;
  right: -2rem;
`
const GameImageContainer = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;
  `
const GameImage = styled.img`
  object-fit: contain;
  width: 100%;
`
const EventCardWithBasicInfo = styled(StyledEventCard)`
  grid-template-columns: 1fr 1fr;

  @media(min-width: 1024px) {
    display: block;
    width: 100%;
  }
`
const EventInfo = styled.div`
  h3 {
    vertical-align: text-top;
  }

  span, h3 {
    color: #DE605B;
  }
`
const DescriptionParagraph = styled.p`
  grid-column: 1 / 4;
  word-wrap: break-word;
`