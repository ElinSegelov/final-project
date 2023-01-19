/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import user from 'reducers/user';
// import events from 'reducers/events';
import styled from 'styled-components/macro';
import EventSection from './events/EventSection';
import UserProfileCard from './UserProfileCard';
import UserEvents from './UserEvents';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((store) => store.user.userInfo);
  const hostingEvents = useSelector((store) => store.events.hostingEvents);
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    // const hosting = JSON.parse(localStorage.getItem('hostingEvents'));
    if (loggedInUser) {
      dispatch(user.actions.setLoggedInUser(loggedInUser));
      // dispatch(events.actions.setHostingEvents(hosting));
    }
  }, [dispatch]);

  // This will prevent to access personal page if not authenticated
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
    // localStorage.setItem('hostingEvents', JSON.stringify(hostingEvents));
  }, [hostingEvents, userInfo]);
  return (
    <DashboardWrapper>
      {window.innerWidth < 1024
        ? <UserProfileCard />
        : <UserProfileWrapperDesktop>
          <UserProfileCard />
          <UserEvents />
        </UserProfileWrapperDesktop>}
      <EventSection />
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled.section`
  min-height: 100%;
  
  @media (min-width: 1024px) {
    width: 100%;
    display: grid;
    grid-template-columns: 28rem 1fr;
  }
`
const UserProfileWrapperDesktop = styled.section`
    display: none;
  
    @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--orangeRed);
    padding-right: 1rem;
    min-height: calc(100vh - 15vh);
    max-height: 120vh;
    grid-row: 1 / 3;
  }
  
  @media (min-width: 1400px) {
    max-width: 40rem
  }
`