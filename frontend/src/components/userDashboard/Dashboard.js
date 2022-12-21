import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components/macro';
import EventSection from './events/EventSection';
import UserProfileCard from './UserProfileCard';

const Dashboard = () => {
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const navigate = useNavigate();
  // This will prevent to access personal page if not authenticated
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate])

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