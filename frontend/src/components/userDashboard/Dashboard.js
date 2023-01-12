import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components/macro';
import user from 'reducers/user';
import events from 'reducers/events';
// import { InnerWrapper } from 'styles/Containers';
import EventSection from './events/EventSection';
import UserProfileCard from './UserProfileCard';
import UserEvents from './UserEvents';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((store) => store.user.userInfo)
  const hostingEvents = useSelector((store) => store.events.hostingEvents)
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    const hosting = JSON.parse(localStorage.getItem('hostingEvents'))
    if (loggedInUser) {
      dispatch(user.actions.setLoggedInUser(loggedInUser))
      dispatch(events.actions.setHostingEvents(hosting))
    }
  }, [dispatch])

  // This will prevent to access personal page if not authenticated
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate])

  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(userInfo))
    localStorage.setItem('hostingEvents', JSON.stringify(hostingEvents))
  }, [hostingEvents, userInfo])
  return (
    <DashboardWrapper>
      <UserProfileWrapperDesktop>
        <UserProfileCard />
        <UserEvents />
      </UserProfileWrapperDesktop>
      <EventSection />
    </DashboardWrapper>
  )
}

export default Dashboard;

const DashboardWrapper = styled.section`
/*   padding: 1rem; */
  @media (min-width: 1024px) {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
  }
`

const UserProfileWrapperDesktop = styled.section`
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 100vh;
    border-right: 1px solid var(--orangeRed);
    padding-right: 1rem;
    /* border: 1px solid red; */
  }
`