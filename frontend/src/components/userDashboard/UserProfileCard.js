/* eslint-disable no-unused-vars */

/* eslint-disable max-len */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router';
import user from 'reducers/user';
import { RiEdit2Fill } from 'react-icons/ri'
// import { GiAbstract112 } from 'react-icons/gi'
import { GiClosedBarbute } from 'react-icons/gi'
import { ButtonReversed, TransparentButton } from 'styles/Button.styles';

const UserProfileCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((store) => store.user.userInfo)
  const hostingEventsForDisplaying = useSelector((store) => store.events.hostingEvents)

  // const handleEditUser = () => {
  //   console.log('clicked to edit user')
  // }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
    dispatch(user.actions.setLoggedInUser([]))
  }
  return (
    <ProfileSection>
      <GiClosedBarbute fontSize="5rem" />
      {/* <TransparentButton type="button" onClick={(handleEditUser)}><RiEdit2Fill /></TransparentButton> */}
      <div>
        <UserName>{loggedInUser.username}</UserName>
        <p>Hosting {hostingEventsForDisplaying ? hostingEventsForDisplaying.length : undefined} events</p>
        <p>Interested {loggedInUser.attendingEvents ? loggedInUser.attendingEvents.length : undefined} events</p>
      </div>
      <ButtonReversed type="button" onClick={handleLogout}>Log Out</ButtonReversed>
    </ProfileSection>
  )
}

export default UserProfileCard;

const ProfileSection = styled.section`
  display: flex;
  background-color: #363c46;
  border: 1px solid var(--orangeRed);
  width: 100vw;
  padding: 0.5rem;
  border-radius: 10px;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;

  @media (min-width: 768px) { 
    display: flex;
    height: 10rem;
    width: 100%;
    justify-content: flex-start;
  }
`

const UserName = styled.h2`
  color: #DE605B;
`
