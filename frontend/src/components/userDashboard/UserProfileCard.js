/* eslint-disable max-len */
import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import editIcon from 'assets/icons/icons8-pencil-30.png'

const UserProfileCard = () => {
  const user = useSelector((store) => store.user.userInfo)
  return (
    <ProfileSection>
      <div>
        <ProfileImg src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg" alt="placeholder" />
        <img src={editIcon} alt="Edit" /> {/* onclick set eventSection state */}
      </div>
      <div>
        <h2>{user.username}</h2>
        <p>Hosting {user.hostingEvents ? user.hostingEvents.length : undefined} events</p>
        <p>Attending {user.attendingEvents ? user.attendingEvents.length : undefined} events</p>
      </div>
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

