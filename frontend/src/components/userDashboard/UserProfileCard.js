/* eslint-disable max-len */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import editIcon from 'assets/icons/icons8-pencil-30.png'
import { useNavigate } from 'react-router';
import user from 'reducers/user';

const UserProfileCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((store) => store.user.userInfo)

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
    dispatch(user.actions.setLoggedInUser([]))
  }
  return (
    <ProfileSection>
      <div>
        <ProfileImg src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg" alt="placeholder" />
        <img src={editIcon} alt="Edit" /> {/* onclick set eventSection state */}
      </div>
      <div>
        <h2>{loggedInUser.username}</h2>
        <p>Hosting {loggedInUser.hostingEvents ? loggedInUser.hostingEvents.length : undefined} events</p>
        <p>Attending {loggedInUser.attendingEvents ? loggedInUser.attendingEvents.length : undefined} events</p>
      </div>
      <button type="button" onClick={handleLogout}>Log Out</button>
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
`

const ProfileImg = styled.img`
  width: 5rem;
  height: 5rem;
  padding: 0.5rem;
  border-radius: 50%;
`

