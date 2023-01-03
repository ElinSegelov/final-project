/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components/macro';
import user from 'reducers/user';
import EventSection from './events/EventSection';
import UserProfileCard from './UserProfileCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((store) => store.user.userInfo)
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (loggedInUser) {
      dispatch(user.actions.setLoggedInUser(loggedInUser))
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
  }, [userInfo])
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