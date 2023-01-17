import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import user from 'reducers/user';
import styled from 'styled-components/macro';
import { GiClosedBarbute } from 'react-icons/gi';
import { ButtonReversed } from 'styles/Button.styles';

const UserProfileCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((store) => store.user.userInfo)
  const hostingEventsForDisplaying = useSelector((store) => store.events.hostingEvents)

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
    dispatch(user.actions.setLoggedInUser([]))
  }
  return (
    <ProfileCard>
      <ImageAndUserInfoWapper>
        <GiClosedBarbute fontSize="5rem" />
        <UserInfoWapper>
          <UserName>{loggedInUser.username}</UserName>
          <p>Hosting {hostingEventsForDisplaying
            ? hostingEventsForDisplaying.length : null} events
          </p>
        </UserInfoWapper>
      </ImageAndUserInfoWapper>
      <LogOutButton type="button" onClick={handleLogout}>Log Out</LogOutButton>
    </ProfileCard>
  )
}

export default UserProfileCard;

const LogOutButton = styled(ButtonReversed)`
  width: 7rem;
`

const ProfileCard = styled.section`
  display: flex;
  justify-content: space-between;
  background: var(--dark);
  border: 1px solid var(--orangeRed);
  width: 100%;
  padding: 0.5rem;
  border-radius: 10px;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;

  @media (min-width: 768px) { 
    height: 10rem;
    height: 6rem;
    padding: 1rem;
  }
`
const ImageAndUserInfoWapper = styled.div`
  display: flex;
  gap: 1rem;
`
const UserInfoWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const UserName = styled.h2`
  color: var(--orangeRed);
`
