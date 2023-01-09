/* eslint-disable no-undef */
/* eslint-disable max-len */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router';
import user from 'reducers/user';
import { RiEdit2Fill } from 'react-icons/ri'
import { ButtonReversed, TransparentButton } from 'styles/Button.styles';

const UserProfileCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((store) => store.user.userInfo)

  const handleEditUser = () => {
    console.log('clicked to edit user')
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
    dispatch(user.actions.setLoggedInUser([]))
  }
  return (
    <ProfileSection>
      <div>
        <ProfileImg src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg" alt="placeholder" />
        <TransparentButton type="button" onClick={(handleEditUser)}><RiEdit2Fill /></TransparentButton>
      </div>
      <div>
        <UserName>{loggedInUser.username}</UserName>
        <p>Hosting {loggedInUser.hostingEvents ? loggedInUser.hostingEvents.length : undefined} events</p>
        <p>Attending {loggedInUser.attendingEvents ? loggedInUser.attendingEvents.length : undefined} events</p>
      </div>
      <ButtonReversed type="button" onClick={handleLogout}>Log Out</ButtonReversed>
    </ProfileSection>
  )
}

export default UserProfileCard;

const ProfileSection = styled.section`
  display: flex;
  background-color: #363c46;
  
  width: 100vw;
  border-radius: 10px;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 2;
`

const ProfileImg = styled.img`
  width: 5rem;
  height: 5rem;
  padding: 0.5rem;
  border-radius: 50%;
`
const UserName = styled.h2`
  color: #DE605B;
`
