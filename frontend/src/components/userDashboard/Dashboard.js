import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components/macro';
import user from 'reducers/user';
import events from 'reducers/events';
import EventSection from './events/EventSection';
import UserProfileCard from './UserProfileCard';

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
      <UserProfileCard />
      <EventSection />
    </DashboardWrapper>
  )
}

export default Dashboard;

const DashboardWrapper = styled.section`
/*   padding: 1rem; */
`